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
  filteredProductList = new Array<Products>();
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
        // This will be the list to use but we have the backup of all products in the other product list
        this.filteredProductList = this.productList;
    });
    // Another way but in this case it returns directly the observable of product, however it all depends on what you want to do
    // if you dont want to subscribe this is good method, but cannot be used for filter data with a search because you need an array
    // this method does not need a subscription but you need to make sure to use the Asnyn pipe to destroy the observable in the html
    this.productList$ = this.productService.getall2();
   }

   filter(query: string) {
     if (query) {
       this.filteredProductList = this.productList.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
       console.log('Filtering....');
       console.log(this.filteredProductList);

     } else {
       this.filteredProductList = this.productList;
       console.log('No filtering...');
       console.log(this.productList);
     }
   }

   ngOnInit() {
  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

}
