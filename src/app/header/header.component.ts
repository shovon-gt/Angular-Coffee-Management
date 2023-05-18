import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  id = localStorage.getItem("id")
  userInfo: any;
  name: any;
  username = localStorage.getItem("username")
  constructor( private router: Router,private location: Location, private service: AuthService){}
  ngOnInit(): void {
    this.userDetails()
  }
  userDetails(){
    this.service.singleUser(this.id).subscribe((data)=>{
      this.userInfo = data
      console.log(this.userInfo);
      
      this.name = this.userInfo.username;
      console.log('name',this.name);
      
    })
  }
  handleLogout() {
    window.localStorage.clear();
    // this.location.reload();
	// window.location.reload();
	// window.location.replace(`http://192.168.56.1:8000/`);
  // localStorage.setItem('isLoggedIn', 'false');
    this.router.navigateByUrl('login');
  // this.authService.logout();
  // this.service.logout();
    // window.location.reload();
    
    // this.reLoad()
    
  }
  // reLoad(){
  //   window.location.reload()
  // }

}
