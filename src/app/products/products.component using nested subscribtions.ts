import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Products } from '../models/products';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from 'src/services/category.service';
import { Categories } from '../models/categories';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnDestroy {

  productList$: Observable<Products[]>;
  productList = new Array<Products>();
  filteredProducts: Products[] = [];
  categoryList$: Observable<Categories[]>;
  selectedCategory: string;
  productSubscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {

    // Another way but in this case it returns directly the observable of product, however it all depends on what you want to do
    // if you dont want to subscribe this is good method, but cannot be used for client filter data with a search because you need an array
    // this method does not need a subscription but you need to make sure to use the Asnyn pipe to destroy the observable in the html
    this.productList$ = productService.getall2();

    // This way you can handle client side filter transforming the observable to a list
    this.productSubscription =  productService.getall2().subscribe(productArray => {
      this.productList = productArray;

    // This will read the query params from the URL everytime it changes
      route.queryParamMap.subscribe(paramMap => {
      this.selectedCategory = paramMap.get('category');

    // This is the filter mecanism. NOTICE is inside the subscribe of query param
      this.filteredProducts = (this.selectedCategory) ?
        this.productList.filter(p => p.category === this.selectedCategory) :
        this.productList;

    });

    });

    this.categoryList$ = categoryService.getall2();


   }

   ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }

}
