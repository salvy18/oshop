import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(private auth: AuthService, private router: Router) {
   }

  login() {
    this.auth.login();
    // One way to navegate to any where i want
    // this.router.navigate(['']);
  }
}
