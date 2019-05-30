import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
// import { CanActivate } from '@angular/router/src/utils/preactivation';
import { CanActivate } from '@angular/router/src/interfaces';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private route: Router, private userService: UserService) { }


  canActivate() {
   return true;
  }



}



