import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './component/product/product.component';
import { CartComponent } from './component/cart/cart.component';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SignupComponent } from './component/header/signup/signup.component';
import { LoginComponent } from './component/header/login/login.component';
import { CheckoutComponent } from './component/cart/checkout/checkout.component';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { AuthGuard } from './auth.guard';
import { MyProductsComponent } from './component/my-products/my-products.component';

const routes: Routes = [
  {path:'', redirectTo:'products', pathMatch:'full'},
  {path:'products', component: ProductComponent},
  {path:'cart', component:CartComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'my-orders', component: MyOrdersComponent},
  {path: 'my-products', component: MyProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
