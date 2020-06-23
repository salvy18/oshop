import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../models/products';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.sass']
})
export class ProductCardComponent {

 @Input() product: Products;
 @Input() buttonDescription: string;
 @Input() showActions: boolean;

  constructor() { }

}
