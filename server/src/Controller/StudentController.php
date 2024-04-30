<?php

// src/Controller/StudentController.php

namespace App\Controller;

use App\Entity\Student;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StudentController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/students', methods: ['GET'])]
    public function viewStudents(): Response
    {
        $students = $this->entityManager->getRepository(Student::class)->findAll();
    
        // Transforming the entities to an array with selected fields
        $studentsArray = array_map(function ($student) {
            return [
                'id' => $student->getId(),
                'fname' => $student->getFname(),
                'lname' => $student->getLname(),
                'nic' => $student->getNic(),
                'mobile' => $student->getMobilenumber(),
                'email' => $student->getEmail(),
            ];
        }, $students);
    
        return $this->json($studentsArray, 200, [], ['groups' => 'student']);
    }
    

    #[Route('/addstudent', methods: ['POST', 'OPTIONS'])]
    public function addStudent(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        //print the data in the terminal
        $student = new Student();
        $student->setFname($data['fname']);
        $student->setLname($data['lname']);
        $student->setNic($data['nic']);
        $student->setMobilenumber($data['mobile']);
        $student->setEmail($data['email']);

        $this->entityManager->persist($student);
        $this->entityManager->flush();

        return $this->json(['success' => true], 201);

    }
}

