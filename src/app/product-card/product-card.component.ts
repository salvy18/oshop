import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Products } from '../models/products';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent implements OnDestroy, OnInit {

 @Input() product: Products;
 @Input() buttonDescription: string;
 @Input() showActions: boolean;
 @Input() userShoppingCart: AngularFirestoreDocument<unknown>;
 itemSubscription: Subscription;
 shoppingQty: number = 0;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit() {
   // console.log('Product Card Init');
    this.getCartQuantity();
  }

 getCartQuantity() {
  // console.log('getQuantity');
  if (!this.userShoppingCart) return 0;

  let itemRef = this.userShoppingCart.collection('items').doc(this.product.id).get();
  if (itemRef) {
    this.itemSubscription = itemRef.pipe(take(1)).subscribe(item =>{
      if (item.exists) {
        this.shoppingQty =  item.data().quantity;
      }
    });
  }
 }

  ngOnDestroy() {
    // this.itemSubscription.unsubscribe();
  }

 async addToCart() {
     let addedToCart = await this.cartService.addToCart( this.product);

     // On changes go ahead and get the quantities
    this.userShoppingCart.collection('items').doc(this.product.id).valueChanges().pipe(take(1)).subscribe(onChanges =>{
      this.getCartQuantity();
    });
  }

 async removeFromCart() {
    let removedToCart = await this.cartService.removeFromCart(this.product);
    this.userShoppingCart.collection('items').doc(this.product.id).valueChanges().pipe(take(1)).subscribe(onChanges =>{
      this.getCartQuantity();
    });
  }

}
