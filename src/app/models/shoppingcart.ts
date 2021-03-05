import { ShoppingCartProduct } from './shoppingcart-product';

export interface ShoppingCart {
  items: ShoppingCartProduct[],
  createdDate: number,
  totalItems: number
}
