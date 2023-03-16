<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    #[Route('/main', name: 'index')]
    public function index()
    {
        $formRegister = $this->createForm(RegistrationFormType::class, new User());

        return $this->render('main/index.html.twig', [
            'formRegister' => $formRegister->createView(),
        ]);
    }
}
