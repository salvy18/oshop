import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { Observable } from 'rxjs';
import { EventsService } from 'src/services/events.service';
import { createViewContainerData } from '@angular/core/src/view/refs';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { EventNames } from './models/EventNames';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit  {


  title = 'oshop';
  ShowSpinner = false;

   constructor( private auth: AuthService, private router: Router, public userService: UserService, private events: EventsService, private shoppingCartService:ShoppingCartService) {
    this.ShowSpinner = true;



    this.auth.user$.subscribe( user => {
        this.ShowSpinner = false;

        // IF not user has been logged in then EXIT
        if (!user) return;

        // OTHERWISE This will make sure to add or update this user in firebase DB
        userService.save(user);

       // ALSO This wil make sure to redirect the user to the home page after use loged in
        let returnUrl = localStorage.getItem('returnURL');
      // But this needs to happen ONLY the first time, so on each refresh does not take you to the Home page
        if (!returnUrl) return;

      // Here remove the local storage and redirect the user to Home Page
        localStorage.removeItem('returnURL');
        this.router.navigateByUrl(returnUrl);

      // console.log( returnUrl);

    });


  }


  async ngOnInit() {
    let cart = await this.shoppingCartService.getCart();
    this.events.broadcast(EventNames.ShoppingCrtCreated, cart);
  }



}

