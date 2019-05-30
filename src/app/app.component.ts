import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'oshop';
  ShowSpinner = false;


  constructor( private auth: AuthService, private router: Router, public userService: UserService) {
    this.ShowSpinner = true;
    this.auth.user$.subscribe( userResult => {
        this.ShowSpinner = false;
        if (userResult) {
          // This will make sure to add or update this user in firebase DB
          userService.save(userResult);

          let returnUrl = localStorage.getItem('returnURL');
          this.router.navigateByUrl(returnUrl);
          // console.log( returnUrl);
        }
    });
  }
}
