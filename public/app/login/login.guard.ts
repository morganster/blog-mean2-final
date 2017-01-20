import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private user: LoginService) {}

  canActivate() {
    return this.user.isLoggedIn();
  }
}