import { NgModule } from '@angular/core';
import { LoginComponent } from "./login/login.component";   
import { AddStudentComponent } from "./addstudent/addstudent.component";
import { RouterModule, Routes } from '@angular/router';
import { ViewStudentComponent } from './view-student/view-student.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'addstudent', component: AddStudentComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'viewstudent', component: ViewStudentComponent},
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  