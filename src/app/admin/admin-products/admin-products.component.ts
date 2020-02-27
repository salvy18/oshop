import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Observable, Subscription } from 'rxjs';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.sass']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products$: Observable<firebase.firestore.QuerySnapshot>;
  productList = new Array<Products>();
  productList$: Observable<Products[]>;
  productSubscription: Subscription;


  constructor(private productService: ProductService) {
    // This method is good but you have to convert the service result into an array and then destroy the subscription, as the service
    // does not return the array you are expecting
    this.products$ = this.productService.getall();
    this.productSubscription =  this.products$.subscribe(querySnapshot => {
        this.productList = querySnapshot.docs.map(doc => {
          let data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            category: data.category,
            price: data.price,
            imageUrl: data.url
          };
        });
    });
    // Another way which i belive its better the service return already the observable of products array
    // and no subscription at this method but making sure to use the Asnyn pipe to destroy the observable
    this.productList$ = this.productService.getall2();
   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

}
