import {  Router } from '@angular/router';

import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';




@Injectable()

export class AuthGuard  {

  constructor(private auth: AuthService, private router: Router) {}




  canActivate(): boolean {

    if (!this.auth.isLoggedIn()) {

      this.router.navigate(['login']);

      return false;
    }

    return true;

  }

}