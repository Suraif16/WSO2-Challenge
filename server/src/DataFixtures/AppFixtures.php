<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\UserAuth;
use App\Entity\Student;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // Load dummy user_auth records
        $userAuthData = [
            ['user_id' => 'admin', 'password' => '1234']
        ];

        foreach ($userAuthData as $userData) {
            $userAuth = new UserAuth();
            $userAuth->setUserId($userData['user_id']);
            $userAuth->setPassword($userData['password']); // Please hash passwords properly in a real application
            $manager->persist($userAuth);
        }

        // Load dummy student records
        $studentData = [
            ['fname' => 'suraif', 'lname' => 'muhammad', 'nic' => '200026002119', 'mobilenumber' => '0766093011', 'email' => 'muhammadsuraif2000@gmail.com'],
            ['fname' => 'Shehan', 'lname' => 'Fernando', 'nic' => '200021202119', 'mobilenumber' => '0112323221', 'email' => 'shehan@gmail.com'],
            ['fname' => 'Shenal', 'lname' => 'Lahiru', 'nic' => '200031202119', 'mobilenumber' => '0122323221', 'email' => 'shelan@gmail.com'],
            ['fname' => 'John', 'lname' => 'Doe', 'nic' => '123456789', 'mobilenumber' => '1234567890', 'email' => 'john.doe@example.com'],
            ['fname' => 'Jfohn', 'lname' => 'Dofe', 'nic' => '127456789', 'mobilenumber' => '1234567890', 'email' => 'jchn.doe@example.com'],
            ['fname' => 'wqwqw', 'lname' => 'qwqwqw', 'nic' => '21322', 'mobilenumber' => '322121', 'email' => 'sfewswz@wew.com'],
            ['fname' => 'Shannaka', 'lname' => 'Perera', 'nic' => '200029912919', 'mobilenumber' => '0771234567', 'email' => 'shankaperera@gmail.com'],
        ];

        foreach ($studentData as $studentInfo) {
            $student = new Student();
            $student->setFname($studentInfo['fname']);
            $student->setLname($studentInfo['lname']);
            $student->setNic($studentInfo['nic']);
            $student->setMobilenumber($studentInfo['mobilenumber']);
            $student->setEmail($studentInfo['email']);
            $manager->persist($student);
        }

        $manager->flush();
    }
}
