import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute ) {
    this.user$ = afAuth.authState;
  }

  login() {
    // This is to assign the value of the URL the user was tyring to access prior to login because after we lose the URL
    // but you need to import the ActivatedRoute from Angular
    let returnUrl = this.route.snapshot.queryParamMap.get('returnURL') || '/';
    // Then we record this URL in an Local storage so we can used later
    localStorage.setItem('returnURL', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
