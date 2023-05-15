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
  id = localStorage.getItem("id")
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.userInformation()
  }
  userInformation(){
    this.authService.singleUser(this.id).subscribe((data)=>{
      console.log(data);
      this.message = data
      console.log('message', this.message.message);
      // if (this.message.is_staff=true) {
      //   this.isAdmin = true;
      // } else {
      //   this.isAdmin = false;
      // }
      
      
    })
  }
}

