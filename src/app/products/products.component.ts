import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Products } from '../models/products';
import { Observable, Subscription } from 'rxjs';
import { Categories } from '../models/categories';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/services/shopping-cart.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productList$: Observable<Products[]>;
  productList = new Array<Products>();
  filteredProducts: Products[] = [];
  categoryList$: Observable<Categories[]>;
  selectedCategory: string;
  productSubscription: Subscription;
  shoppingCart: AngularFirestoreDocument<unknown>;


  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
    ) {

    // Another way but in this case it returns directly the observable of product, however it all depends on what you want to do
    // if you dont want to subscribe this is good method, but cannot be used for client filter data with a search because you need an array
    // this method does not need a subscription but you need to make sure to use the Asnyn pipe to destroy the observable in the html
    this.productList$ = productService.getall2();


    // This way you can handle client side filter transforming the observable to a list
    // Noticed i am using switchmap because i am dealing with multiple observable and i want
    // the first one to complete before it can subscribe to the next one.
    this.productSubscription =  productService
      .getall2().pipe(switchMap (productArray => {
      this.productList = productArray;
      return route.queryParamMap;
      }))
      .subscribe(paramMap => {
        this.selectedCategory = paramMap.get('category');

      // This is the filter mecanism. NOTICE is inside the subscribe of query param
        this.filteredProducts = (this.selectedCategory) ?
          this.productList.filter(p => p.category === this.selectedCategory) :
          this.productList;
      });

      // This is another method to get the shopping cart using the observable
      //  shoppingCartService.getCart().then(document =>{
      //    if (document) {
      //     console.log('Cart in Product');
      //     this.shoppingCart = document;
      // }});

   }

 async ngOnInit() {
    this.shoppingCart = await this.shoppingCartService.getCart()
    console.log('Product On Init');
 
  }

   ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

}
