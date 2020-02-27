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

  // This is a way using Promise to retun a boolean by checking if user is admin
  // async canActivate(): Promise<boolean> {

  //   let user = await this.auth.user$.toPromise();
  //   let appUSer = await this.userService.get(user.uid).toPromise();
  //   return appUSer.isAdmin;
  // }

    // This is a way in Observable to return a boolean by checking if user is Admin, now see that i didn't need to use switchmap because it
    // was same time of observable
  canActivate() {
        return this.auth.appUser$
            .pipe(map(appUSer => appUSer.isAdmin)
        );


        // This was the previous code before we created a property in auth service
        // return this.auth.user$
        //  .pipe(
        //   switchMap(user => this.userService.get(user.uid)),
        //   map(appUSer => appUSer.isAdmin)
        //   );

  }
}



