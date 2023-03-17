<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\UserAuthenticator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;

class RegistrationController extends AbstractController
{
    private $urlGenerator;

    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
    }

    #[Route('/register', name: 'app_register')]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, UserAuthenticatorInterface $userAuthenticator, UserAuthenticator $authenticator, EntityManagerInterface $entityManager): Response
    {
        $user = new User();
        $form = $this->createForm(RegistrationFormType::class, $user);
        $form->handleRequest($request);
    
        if ($request->isXmlHttpRequest()) {
            if ($form->isSubmitted()) {
                if ($form->isValid()) {
                    // encode the plain password
                    $user->setPassword(
                        $userPasswordHasher->hashPassword(
                            $user,
                            $form->get('plainPassword')->getData()
                        )
                    );
    
                    $entityManager->persist($user);
                    $entityManager->flush();
                    
                    $redirectUrl = $this->urlGenerator->generate('ventes');

                    return new JsonResponse([
                        'success' => true,
                        'redirectUrl' => $redirectUrl
                    ]);
                }
    
                $errors = [];
                foreach ($form->all() as $fieldName => $formField) {
                    foreach ($formField->getErrors(true) as $error) {
                        $errors[$formField->getName()][] = $error->getMessage();
                    }
                }
    
                return new JsonResponse(['success' => false, 'message' => 'Erreur lors de l\'inscription.', 'errors' => $errors]);
            }
    
            return new JsonResponse(['success' => false, 'message' => 'Le formulaire n\'a pas été soumis.']);
        }
    
        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $user->setPassword(
                $userPasswordHasher->hashPassword(
                    $user,
                    $form->get('plainPassword')->getData()
                )
            );
    
            $entityManager->persist($user);
            $entityManager->flush();
    
            return $userAuthenticator->authenticateUser(
                $user,
                $authenticator,
                $request
            );
        }
    
        $formRegister = $this->createForm(RegistrationFormType::class, new User());
    
        return $this->render('main/index.html.twig', [
            'formRegister' => $formRegister->createView(),
        ]);
    }
}