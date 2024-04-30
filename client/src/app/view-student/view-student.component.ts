import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  students: any[]; // Assuming your student data structure

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Assuming your Symfony backend endpoint for fetching students is '/students'
    const apiUrl = 'http://symfony:80/students';
    // const apiUrl = 'https://symfonycrudapp.azurewebsites.net/students';

    this.http.get<any[]>(apiUrl)
      .subscribe(
        (data) => {
          this.students = data;
        },
        (error) => {
          console.error('Error fetching students', error);
        }
      );
  }
}