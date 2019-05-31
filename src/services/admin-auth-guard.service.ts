import { AppUser } from './../app/models/app-users';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

// import { CanActivate } from '@angular/router/src/utils/preactivation';
import { CanActivate } from '@angular/router/src/interfaces';
import { UserService } from './user.service';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private route: Router, private userService: UserService) { }


  async canActivate(): Promise<boolean> {

    // this.auth.user$.toPromise().then(x=>{
    //     let user= x;
    //     this.userService.get(user.uid).toPromise().then(x=>{
    //       let appUser= x;
    //       return appUser.isAdmin;
    //     })

    // });

    let user = await this.auth.user$.toPromise();
    let appUSer = await this.userService.get(user.uid).toPromise();
    return appUSer.isAdmin;

    // return this.auth.user$
    // .pipe(
    //     switchMap(user =>this.userService.get(user.uid)),
    //     map(appUSer=> appUSer.isAdmin),
    //     map(x=> 10),
    //     map(x=> 10),
    //     );
  }



}



