import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit{
  id = localStorage.getItem("id")
  userDetails: any;
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.userInformation()
  }
  userInformation(){
    this.authService.singleUser(this.id).subscribe((data)=>{
      console.log(data);
      this.userDetails = data
      if(this.userDetails.team == null){
        this.userDetails.team = "N/A";
      }
    })
  }

}
