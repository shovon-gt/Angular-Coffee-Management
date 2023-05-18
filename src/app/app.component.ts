import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isAdmin = false;
  title = 'coffee_management';
  message:any;
  isStaff = false;
  isLoggedIn = localStorage.getItem('isLoggedIn');
  id = localStorage.getItem("id")
  constructor(public authService: AuthService){}

  ngOnInit(): void {
    // console.log('isLoggedIn', this.isLoggedIn);
    
    // this.userInformation();
  }
  // userInformation(){
  //   this.authService.singleUser(this.id).subscribe((data)=>{
  //     console.log(data);
  //     this.message = data
  //     console.log('message', this.message.is_staff);
  //     if (this.message.is_staff) {
  //       this.isStaff = true;
  //       console.log('true', this.isStaff);
  //     }
  //     else if(!this.message.is_staff){
  //       this.isStaff = false;
  //       console.log('false', this.isStaff);
  //     }
  //     else {
  //       this.isStaff = false;
  //     }      
      
  //   })
  // }
}

