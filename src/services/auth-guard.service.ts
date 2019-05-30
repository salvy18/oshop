import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { AuthService } from 'src/services/auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private auth: AuthService, private router: Router) {

   }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map(userResult => {
      if (userResult) {
        return true;
      }

      // The RouterStateSnap shot will give me the original path the user trie to access
      // The optional parameters queryparams will send optional paramters to the URL like the state.url this way i can capture the URL
      // the URL the user was tyring to reach so i can later redirected to same URL after the login
      this.router.navigate(['/login'], { queryParams: { returnURL: state.url}});

      // console.log(state.url);
      return false;
    }));

  }

}
