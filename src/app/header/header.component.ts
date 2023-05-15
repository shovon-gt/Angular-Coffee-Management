import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  id = localStorage.getItem("id")
  username = localStorage.getItem("username")
  constructor( private router: Router){}
  
  handleLogout() {
    window.localStorage.clear();
	// window.location.reload();
	// window.location.replace(`http://192.168.56.1:8000/`);
    // console.log('clicked', this.id);
    this.router.navigateByUrl('login');
  }

}
