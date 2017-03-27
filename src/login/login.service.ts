import { Injectable } from '@angular/core';
import { Http, Headers,Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginService {
  private loggedIn = false;
    private loginUrl = 'http://localhost:8080/api/login';

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

login(username:string, password:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        this.loginUrl, 
        JSON.stringify({ 'username':username, 'password':password }), 
        { headers }
      )
      .map(res => {
        let token = res.json() && res.json().token;
        if(token){
            localStorage.setItem('auth_token', res.json().token);
          this.loggedIn = true;
          return true;
        }else{
          this.loggedIn = false;
          return false;
        }
        
      })
      
      .catch(this.handleError);
  }
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    return true;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  private handleError(error : Response | any){
    let errMsg:String;
    if(error instanceof Response){
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    }else{
      errMsg = error.message ? error.message : error.toString();
    }
   // console.log(errMsg);
    return Observable.throw(errMsg);
  }

}
