import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/services/category.service';
import { Categories } from 'src/app/models/categories';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.sass']
})
export class ProductFilterComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('selectedCategory') selectedCategory: string;
  categoryList$: Observable<Categories[]>;

  constructor(
    categoryService: CategoryService,
    route: ActivatedRoute
    ) {
    this.categoryList$ = categoryService.getall2();
  }

  ngOnInit() {
  }

}
