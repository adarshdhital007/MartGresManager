import { ProductDBService } from './services/productdb.service';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { CartComponent } from './components/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSuccessModalComponent } from './components/order-success-modal/order-success-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductdetailsComponent,
    FeaturedComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    UserInfoComponent,
    CheckoutComponent,
    OrderSuccessModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,FormsModule,ReactiveFormsModule,MatButtonModule,MatDialogModule,MatIconModule, BrowserAnimationsModule],
  providers: [ProductDBService,provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
