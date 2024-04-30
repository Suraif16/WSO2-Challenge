// Your Angular LoginComponent

import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router) { }

  login(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;

    // Assuming your Symfony backend endpoint for login is '/login'
    const apiUrl = 'http://symfony:80/login';
    // const apiUrl = 'https://symfonycrudapp.azurewebsites.net/login';

    // Create HttpParams with username and password
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    this.http.post<{ success: boolean }>(apiUrl, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .subscribe(
        (response) => {
          console.log('Authentication successful', response);

          // Redirect to another page on successful login
          if (response.success) {
            this.router.navigate(['/viewstudent']); 
          }
          else{
            alert("Invalid Username or Password");
          }
        },
        (error) => {
          console.error('Authentication failed', error);

          // Display an error notification or handle the error as needed
        }
      );

    console.log('Logging in...');
    // You can add your authentication service call here
  }
}
