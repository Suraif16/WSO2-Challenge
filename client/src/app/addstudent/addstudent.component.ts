import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddStudentComponent {

  constructor(private http: HttpClient, private router: Router) { }

  addStudent(form: NgForm) {
    const fname = form.value.fname;
    const lname = form.value.lname;
    const nic = form.value.nic;
    const mobile = form.value.mobile;
    const email = form.value.email;

    // Assuming your Symfony backend endpoint for login is '/login'
    const apiUrl = 'http://symfony:80/addstudent';
    // const apiUrl = 'https://symfonycrudapp.azurewebsites.net/addstudent';

    // Create a JSON object with the student data
    const requestBody = {
      fname: fname,
      lname: lname,
      nic: nic,
      mobile: mobile,
      email: email
    };

    // Log the JSON object for debugging purposes
    console.log(requestBody);

    this.http.post<{ success: boolean }>(apiUrl, requestBody, {
      headers: { 'Content-Type': 'application/json' },
      
    })
      .subscribe(
        (response) => {
          console.log(response)
          // Redirect to another page on successful login
          if (response.success) {
            console.log('Student added successfully');
            this.router.navigate(['/viewstudent']);
          } 
        },
        (error) => {
          console.error('Error adding student', error);

          // Display an error notification or handle the error as needed
        }
      );
  }

  onCancel() {
    // Navigate back to the view page
    this.router.navigate(['/viewstudent']);
  }
}
