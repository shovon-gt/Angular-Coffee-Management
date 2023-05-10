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
      

  // headerDict = {
  //   'Content-Type': 'application/json',
  //   'Accept': 'application/json',
  //   // 'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  // }
  
  // requestOptions = {                                                                                                                                                                                 
  //   headers: new Headers(this.headerDict), 
  // };
  
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
  addEmployee(val:any){
    return this.http.post(this.apiUrl+'/postemployee', val)
  }
}
