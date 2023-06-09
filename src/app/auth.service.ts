import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {} from 'rxjs';
// import { environment } from './../environments/environment';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://192.168.71.100:30800';
  stringifiedData: any; 
  headers = new HttpHeaders()
      .append('Content-Type','application/json')

  
  constructor(private http: HttpClient) { }
  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  public _isLoggedIn: Observable<boolean> = this.isLoggedInSource.asObservable();
  // castUser = this.user.asObservable();
  set isLoggedIn(logged: boolean) {
    this.isLoggedInSource.next(logged);
  }

  logout() {
    window.location.reload();
  }

  login(body: any){
    const url = `${this.apiUrl}/login/`;    
    return this.http.post(url, body, {headers: this.headers});
  }
  login2(value:any){
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Accept': 'application/json'
    });
    const options = {
      headers:headers
    }
    return this.http.post(this.apiUrl+'/login/', value, options)
  }

  signup(username: string, email: string, password: string){
    const url = `${this.apiUrl}/register_user/`;
    const body = {username, email, password};
    return this.http.post(url, body);
  }

  signup2(value:any){
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Accept': 'application/json'
    });
    const options = {
      headers:headers
    }
    return this.http.post(this.apiUrl+'/register_user/', value, options)
  }
  allData():Observable<any>{
    return this.http.get(this.apiUrl+ '/userlist/');
  }
  addUser(val:any){
    return this.http.post(this.apiUrl+'/register_user/', val, {headers: this.headers})
  }
  singleUser(id:any){
    return this.http.get(this.apiUrl+`/singleuser/${id}/`)
  }
  updateUser(formData:any, id: any){
    const url = `${this.apiUrl}/userupdate/${id}/`;
    return this.http.put(url, formData,{headers: this.headers})
  }
  updateBalance(user:any, id: any){
    const url = `${this.apiUrl}/userupdate/${id}/`;
    user.balance = user.balance -15
    return this.http.put(url, user,{headers: this.headers})
  }
  deleteUser(id: any){
    const url = `${this.apiUrl}/userdelete/${id}/`;
    return this.http.delete(url);
  }

  addUser2(value:any){
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Accept': 'application/json'
    });
    const options = {
      headers:headers
    }
    return this.http.post(this.apiUrl+'/register_user/', value, options)
  }

  isAnyoneLoggedIn(){
    return !!localStorage.getItem('id')
  }

}
