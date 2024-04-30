<?php

// src/Controller/LoginController.php

namespace App\Controller;

use App\Entity\UserAuth;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/login', methods: ['POST'])]
    public function login(Request $request): Response
    {
        $username = $request->request->get('username');
        $password = $request->request->get('password');

        $user = $this->entityManager->getRepository(UserAuth::class)->findOneBy(['user_id' => $username, 'password' => $password]);

        if (!$user) {
            // Return a JSON response with an error message
            $response = new JsonResponse(['success' => false]);
            return $response;
        }

        // Return a JSON response with a success message
        $response = new JsonResponse(['success' => true]);
        return $response;
    }
}
