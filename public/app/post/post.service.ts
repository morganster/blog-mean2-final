import { Injectable } from '@angular/core';
import { Http, Response , Headers,RequestOptions} from '@angular/http';

import { Post } from './post';
import { Observable } from 'rxjs/Observable';

//import operators.

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class PostService{
    private postUrl = 'http://localhost:8080/api/posts';

    constructor (private http: Http) {}

    getPost () : Observable<Post[]>{
        return this.http.get(this.postUrl)
        .map( res => res.json());
    }
    private statusMessage = "";

   postPost(title:string, body:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'JWT '+localStorage.getItem('auth_token'));
    let options = new RequestOptions({headers:headers});
    return this.http
      .post(
        this.postUrl, 
        JSON.stringify({ 'title':title, 'body':body }), 
        options
      )
      .map(res => {
          console.log(res.json());
        let message = res.json() && res.json().message;
        if(message){
          return true;
        }else{
          return false;
        }
        
      })
      
      .catch(this.handleError);
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