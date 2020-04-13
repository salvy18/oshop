import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Products } from '../models/products';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/services/category.service';
import { Categories } from '../models/categories';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent {
  productList$: Observable<Products[]>;
  categoryList$: Observable<Categories[]>;

  constructor(productService: ProductService, categoryService: CategoryService) {
    this.productList$ = productService.getall2();
    this.categoryList$ = categoryService.getall2();
   }
}
