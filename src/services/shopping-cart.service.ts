import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Products } from 'src/app/models/products';
import {take, map} from 'rxjs/operators';
import * as firebase from 'firebase';
import { ShoppingCartProduct } from 'src/app/models/shoppingcart-product';
import { ShoppingCart } from 'src/app/models/shoppingcart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor( private db: AngularFirestore) {
  }

  private create() {
    console.log('creting the cart id');
    return this.db.collection('shopping-carts').add({createdDate: new Date().getTime(), totalItems: 0 });
  }

  async getCart(): Promise<AngularFirestoreDocument<ShoppingCart>> {
      let cartId = await this.getOrCreateCartId();
      console.log('returning the cart');
      return this.db.collection('shopping-carts').doc(cartId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartID = localStorage.getItem('cartID');

    if (cartID) { return cartID; };

    // When does not have a cart ID
    let result = await this.create();
    localStorage.setItem('cartID', result.id);

    console.log('Getting the cart');
    console.log(cartID);
    console.log(result.id);
    return result.id;
    }

    private getItem(cartID: string, productID: string) {
      return this.db.collection('shopping-carts').doc(cartID).collection('items').doc(productID).get();
    }

  async addToCart(product: Products) {
    this.updateItemQuantity(product, 1)
  }

  async removeFromCart (product: Products) {
    this.updateItemQuantity(product, -1);
  }

private async updateItemQuantity (product: Products, change: number){
  let cartID = await this.getOrCreateCartId();
  let itemRef$ =  this.getItem(cartID, product.id);


  itemRef$.pipe(take(1)).subscribe(item => {
  let documentToAddOrUpdate: ShoppingCartProduct = {
      Products : product,
      quantity: 1
  };
    if (!item.exists) {
     console.log('Item not exist');
     // Lets create the record
     // this.db.collection('shopping-carts').doc(cartID).collection('items').doc(product.id).set({Product: product, quantity: 1});
     this.db.collection('shopping-carts').doc(cartID).collection('items').doc(product.id).set(documentToAddOrUpdate);
    } else {
      console.log('Exist');
      // Lets locate the document and update -
      // Option #1
      this.db.collection('shopping-carts').doc(cartID).collection('items').doc(product.id).update({ quantity: item.data().quantity + change});

      // this.db.collection('shopping-carts').doc(cartID).collection('items').doc(product.id).update({ quantity: firebase.firestore.FieldValue.increment(1)});

      // Options #2
      // let docRef = this.db.collection('shopping-carts').doc(cartID).collection('items').doc(product.id);
      // docRef.get().pipe(take(1)).subscribe(documentSnapshot => {
      // documentToAddOrUpdate.quantity = documentSnapshot.data().quantity + 1;
      // docRef.update({quantity: documentToAddOrUpdate.quantity });
      // });
    }
  });
  // Update total items in Shopping Cart
  this.updateShoppingCartTotalItem(cartID, change);
}

private updateShoppingCartTotalItem (cartID: string, change: number ) {
  //Get a reference
  let cartRef =  this.db.collection('shopping-carts').doc(cartID);
  cartRef.get().pipe(take(1)).subscribe(documentSnapShot =>{
    let totalItems = documentSnapShot.data().totalItems + change < 0 ? 0 : documentSnapShot.data().totalItems + change;
    cartRef.update({totalItems: totalItems});
    console.log('Totalimg');
  });
}

}
