import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username?: string;
  password?: string;
  // data!: Object;
  // baseUrl ? :'http://172.16.50.62:8000'
  constructor(private authService: AuthService, private router: Router){}
  // logIn(username: string, password: string): Observable {
  //   return this.http.post(
  //     'http://127.0.0.1:8000/api-user-login/', { username, password }
  //     ) as Observable;
  // }

  login2(){
    this.authService.login(this.myForm.value).subscribe(
      (response) =>{
        console.log('response Message',response);
        // alert(response);
        // console.log(response);
        // if(response){
        //   // this.router.navigateByUrl('adminhomepage');
        // }
      },
      (error) => {
        console.log('Error Message',error);
        
      }
     );
    // this.router.navigateByUrl('adminhomepage');
  }

  login(){
    this.authService.login(this.myForm.value).subscribe({
      next(value: any) {
        console.log('v', value.message);
        if(value.message == "Welcome as admin." && value.data.role == "admin" ){
          let id = localStorage.setItem("id", value.data.id);
          let name = localStorage.setItem("name", value.data.username);
          window.location.href = `http://localhost:4200/adminhomepage`;
      }
      else if(value.message == "Welcome as user." && value.data.role == "user"){
          let id = localStorage.setItem("id", value.data.id);
          window.location.href = `http://localhost:4200/userhomepage/`;
          console.log("Hello world")
      }
      else{
          alert("Wrong username or password.");
      }
      },
      error(err) {
        alert("Wrong username or password.");
        console.log('error', err);
        
      },
    })
  }
  
  // form!: FormGroup;
  
  myForm!: FormGroup;
  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }
  myFunction() {
    console.log(this.myForm.value.username);
    console.log(this.myForm.value.password);
  }
}
