import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAnyoneLoggedIn()) {
    return true;
  }
  router.navigateByUrl('login');
  return false;
};

// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from './auth.service';
// class UserToken {}
// class Permissions {
//   canActivate(): boolean {
//     return true;
//   }
// }
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private authService : AuthService, private router: Router){}
//   canActivate(){

//     if(this.authService.isAnyoneLoggedIn()){
//       return true;
//     }
//     alert("please login.")
//     this.router.navigateByUrl('login')
//     return false;
//   }

// }
