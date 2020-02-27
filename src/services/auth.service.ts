import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/models/app-users';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private route: Router
    ) {
    this.user$ = afAuth.authState;
  }

  login() {
    // This is to assign the value of the URL the user was tyring to access prior to login because after we lose the URL
    // but you need to import the ActivatedRoute from Angular
    let returnUrl = this.activateRoute.snapshot.queryParamMap.get('returnURL') || '/';
    // Then we record this URL in an Local storage so we can used later
    localStorage.setItem('returnURL', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.route.navigate(['']);

  }

  // This is how you define a property that return something
  get appUser$(): Observable<AppUser> {
     return this.user$
      .pipe(switchMap(user => {

        if (user) {
          return this.userService.get(user.uid);
        } else {

          return of(null);
        }
      }));
  }

}
