import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Products } from 'src/app/models/products';
import {take, map} from 'rxjs/operators';
import * as firebase from 'firebase';
import { ShoppingCartProduct } from 'src/app/models/shoppingcart-product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor( private db: AngularFirestore) {
  }

  private create() {
    return this.db.collection('shopping-carts').add({createdDate: new Date().getTime()});
  }

  async getCart() {
      let cartId = await this.getOrCreateCartId();
      return this.db.collection('shopping-carts').doc(cartId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cardID = localStorage.getItem('cardID');
    if (cardID) { return cardID; }

    // When does not have a cart ID
    let result = await this.create();
    localStorage.setItem('cardID', result.id);
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
}


}
