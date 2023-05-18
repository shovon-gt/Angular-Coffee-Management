import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute, Route,Router } from '@angular/router';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit{
  id = localStorage.getItem("id");
  isAdmin = localStorage.getItem("isAdmin");
  isStaff: any =false;
  userDetails: any;
  constructor(private authService: AuthService, private route: ActivatedRoute,private router: Router){
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }
  ngOnInit(): void {
    this.userInformation()
  }
  userInformation(){
    this.authService.singleUser(this.id).subscribe((data)=>{
      console.log(data);
      this.userDetails = data
      console.log(this.userDetails);
      if (this.userDetails.is_staff) {
        this.isStaff = true;
        console.log('true', this.isStaff);
      }
      else if(!this.userDetails.is_staff){
        this.isStaff = false;
        console.log('false', this.isStaff);
      }
      else {
        this.isStaff = false;
      }   
      if(this.userDetails.team == null){
        this.userDetails.team = "N/A";
      }
    })
  }
  handleLogout() {
    window.localStorage.clear();
    this.router.navigateByUrl('login');
  }

}
