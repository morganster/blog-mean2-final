import { Component } from '@angular/core';
import { LoginGuard } from './login/login.guard';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';





@Component({
  selector: 'my-app',
  templateUrl: './public/app/app.component.html',
  providers:[LoginService,LoginGuard]

})
export class AppComponent  { 
  constructor(private loginService: LoginService,private loginGuard:LoginGuard, private router:Router,public fb:FormBuilder){}
  
  errorMessage :string;

  public loginForm = this.fb.group({
    username:["",Validators.required],
    password:["",Validators.required]
  });
  showLoginForm = false;
 // public logEvent :EventEmitter = new EventEmitter();
  logout(event){
    
    if(this.loginService.logout()){
      this.router.navigate(['/']);
    }
  }
  
  login(event){
   // console.log(event);
   // console.log(this.loginForm.value.username);
 // este componente se debe trasladar al app ya que desde ahi se debe manejar todo lo del login y logout  
    this.loginService.login(this.loginForm.value.username,this.loginForm.value.password).subscribe(
      result => {
      console.log(result);
      if (result) {
        this.showLoginForm = false;
        this.router.navigate(['/']);
      }else{
        this.errorMessage = "bad credentials";
      }
    },
    error => this.errorMessage = <any>error
    );
  }
  showLogin(){
    this.showLoginForm = true;
  }
}
