import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminHomeComponent } from './home/admin-home/admin-home.component';
import { UserHomeComponent } from './home/user-home/user-home.component';
import { FileUploadComponent } from './home/file-upload/file-upload.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  {path: 'login', component: LoginComponent},
  {path: 'adminhomepage', component: AdminHomeComponent},
  {path: 'userhomepage', component: UserHomeComponent},
  {path: 'userhomepage/:id', component: UserHomeComponent},
  {path: 'fileupload', component:FileUploadComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
