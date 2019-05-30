

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.sass']
})
export class BsNavbarComponent implements OnInit {

  constructor(public auth: AuthService ) {
   }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
