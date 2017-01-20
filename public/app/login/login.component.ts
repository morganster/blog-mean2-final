import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';


import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './public/app/login/login.html',
  providers:[LoginService]

})
export class LoginComponent { 
  errorMessage :string;

  public loginForm = this.fb.group({
    username:["",Validators.required],
    password:["",Validators.required]
  });
  constructor(public fb:FormBuilder,private loginService: LoginService, private router:Router){}
  


  login(event){
   // console.log(event);
   // console.log(this.loginForm.value.username);
 // este componente se debe trasladar al app ya que desde ahi se debe manejar todo lo del login y logout  
    this.loginService.login(this.loginForm.value.username,this.loginForm.value.password).subscribe(
      result => {
      console.log(result);
      if (result) {
        this.router.navigate(['/']);
      }else{
        this.errorMessage = "bad credentials";
      }
    },
    error => this.errorMessage = <any>error
    );
  }
}
