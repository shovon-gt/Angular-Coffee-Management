import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{
  // username = new FormControl('');
  // email = new FormControl('');
  // password = new FormControl('');
  constructor(private authService: AuthService, private router: Router){}
  myForm!: FormGroup;
  // username?: string;
  // email?: string;
  // password?: string;
  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl(''),
      email : new FormControl(''),
      password: new FormControl(''),
      password2: new FormControl('')
    });
  }
  signUp(){
    this.authService.signup(this.myForm.value.username, this.myForm.value.email, this.myForm.value.password).subscribe({
      next(value: any) {
        console.log('v', value);
        // this.router.navigateByUrl('/login');
        window.location.href = `http://localhost:4200/login`
      }
    })
  }
  signUp2(){
    this.authService.signup2(this.myForm.value).subscribe({
      next(value: any) {
        console.log('v', value.message);
      }
    })
  }
}
