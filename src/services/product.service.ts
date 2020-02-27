import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Products } from 'src/app/models/products';
import { map  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$: Observable<firebase.firestore.QuerySnapshot>;
  productList =  new Array<Products>();
  // productList: Products[];
  // tslint:disable-next-line:no-trailing-whitespace

  constructor( private db: AngularFirestore) { }

  create(product) {
    return this.db.collection('products').add(product);
  }

  update(productId: string, product) {
    return this.db.collection('products').doc(productId).update(product);
  }

  delele(productId: string) {
    return this.db.collection('products').doc(productId).delete();
  }

  getall() {
   return this.db.collection('products').get();

  }

  //  This is a better approch to me because it returns the list of product as an array of product model
  getall2() {
    return this.db.collection('products').get().pipe(map(querySnapshot => {
      const productList: Products[] = querySnapshot.docs.map(doc => {
        var data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          category: data.category,
          price: data.price,
          imageUrl: data.imageUrl
        };
      });
      return productList;
    }));
   }

   getProduct(productId) {
    return this.db.collection('products').doc(productId).get();
   }
}
