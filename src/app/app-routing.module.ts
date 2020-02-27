import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { ProductsComponent } from 'src/app/products/products.component';
import { ShoppingCartComponent } from 'src/app/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from 'src/app/check-out/check-out.component';
import { OrderSuccessComponent } from 'src/app/order-success/order-success.component';
import { LoginComponent } from 'src/app/login/login.component';
import { AdminProductsComponent } from 'src/app/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from 'src/app/admin/admin-orders/admin-orders.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { MyOrdersComponent } from 'src/app/my-orders/my-orders.component';
import { AuthGuard } from 'src/services/auth-guard.service';
import { AdminAuthGuard } from 'src/services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';

const routes: Routes = [
  // anonimous users
{ path: '', component: HomeComponent},
{ path: 'products', component: ProductsComponent},
{ path: 'shopping-cart', component: ShoppingCartComponent},
{ path: 'login', component: LoginComponent},
// regular users
{ path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
{ path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]},
{ path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
// admin users

// Notice that i have three of the admin/products but the more generic is the last one that is by purpuse
{
  path: 'admin/products/new',
  component: ProductFormComponent,
  canActivate: [AuthGuard, AdminAuthGuard]
},
{
  path: 'admin/products/:id',
  component: ProductFormComponent,
  canActivate: [AuthGuard, AdminAuthGuard]
},
{
  path: 'admin/admin-products',
  component: AdminProductsComponent,
  canActivate: [AuthGuard, AdminAuthGuard]
},
{
  path: 'admin/admin-orders',
  component: AdminOrdersComponent,
  canActivate: [AuthGuard, AdminAuthGuard]
},
{ path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
