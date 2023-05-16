import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://172.16.50.62:8000';
  stringifiedData: any; 
  headers = new HttpHeaders()
      // .set('content-type','application/json')
      // .set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
      // .set('Access-Control-Allow-Methods', 'POST,  GET')
      // .set('Access-Control-Allow-Origin', '*' )
      // .set('Content-Type', 'text/plain' )
      // .append('Content-Type','text/plain')
      .append('Content-Type','application/json')

  
  constructor(private http: HttpClient) { }


  login(body: any){
    const url = `${this.apiUrl}/login/`;
    // const body = {username, password};
    
    return this.http.post(url, body, {headers: this.headers});
  }

  signup(username: string, email: string, password: string){
    const url = `${this.apiUrl}/register_user/`;
    const body = {username, email, password};
    return this.http.post(url, body);
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
    // console.log("delete User called.");
    return this.http.delete(url);
  }
}
