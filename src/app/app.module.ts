import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductComponent } from './component/product/product.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../shared.service';
import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';
import { SignupComponent } from './component/header/signup/signup.component';
import { LoginComponent } from './component/header/login/login.component';
import { CheckoutComponent } from './component/cart/checkout/checkout.component';
import { MyOrdersComponent } from './component/my-orders/my-orders.component';
import { ProductReviewComponent } from './component/product-review/product-review.component';
import { RouterModule } from '@angular/router';
// import { SignupComponent } from './component/header/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
// import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MyProductsComponent } from './component/my-products/my-products.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HomeComponent } from './component/home/home.component';

// import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductDetailsComponent } from './component/product-details/product-details.component';

import { NgxImageZoomModule } from 'ngx-image-zoom';

import { GroupByPipe } from './service/group-by.pipe';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxImgZoomModule } from 'ngx-img-zoom';
// import { ImageZoomModule } from 'ngx-image-zoom';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductComponent,
    AutocompleteComponent,
    SignupComponent,
    LoginComponent,
    CheckoutComponent,
    MyOrdersComponent,
    ProductReviewComponent,
    MyProductsComponent,
    HomeComponent,
    ProductDetailsComponent,
    GroupByPipe
    // SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSliderModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    NgSelectModule,
    MatDialogModule,
    NgxImageZoomModule,
    // NgxImgZoomModule,
    BrowserAnimationsModule,
    // groupBy
  ],
  exports:[
    GroupByPipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
