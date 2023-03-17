<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route(path: '/login', name: 'app_login')]
    public function login(Request $request, AuthenticationUtils $authenticationUtils): Response
    {
        if ($request->isXmlHttpRequest()) {
            if ($error = $authenticationUtils->getLastAuthenticationError()) {
                return new JsonResponse(['success' => false, 'message' => $error->getMessage()]);
            }

            if ($user = $this->getUser()) {
                // Utilisateur connecté avec succès
                return new JsonResponse(['success' => true, 'redirect' => $this->generateUrl('ventes')]);
            }

            // Échec de connexion non détecté par getLastAuthenticationError
            return new JsonResponse(['success' => false, 'message' => 'Erreur lors de la connexion.']);
        }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/index.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}