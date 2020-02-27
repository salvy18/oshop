import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { AppUser } from '../models/app-users';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.sass']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  appUser: AppUser;
  authSuscriptionRef: Subscription;

  constructor(private auth: AuthService ) {
    this.authSuscriptionRef =  auth.appUser$.subscribe(appUser => this.appUser = appUser);

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.authSuscriptionRef.unsubscribe();

  }

  logout() {
    this.auth.logout();
  }

}
