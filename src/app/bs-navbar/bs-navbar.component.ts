import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { AppUser } from '../models/app-users';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { take } from 'rxjs/operators';
import { EventsService } from 'src/services/events.service';
import { EventNames } from '../models/EventNames';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.sass']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  appUser: AppUser;
  authSuscriptionRef: Subscription;
  shoppingCartItemCount : number = 0;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService , private events:EventsService) {

this.events.on(EventNames.ShoppingCrtCreated ,cart=>{
  let cartRef = cart.valueChanges();
// Option #1 - Having the total items as a property in the cart
  cartRef.pipe(take(1)).subscribe(cart =>{
    console.log('On Init Nav Bar');
    console.log(cart);
    this.shoppingCartItemCount = cart.totalItems;
 });

})
    this.authSuscriptionRef =  auth.appUser$.subscribe(appUser => this.appUser = appUser);

   }

  async ngOnInit() {
    console.log('Nav Bar INIT');

  }

  ngOnDestroy() {
    this.authSuscriptionRef.unsubscribe();

  }

  logout() {
    this.auth.logout();
  }

}
