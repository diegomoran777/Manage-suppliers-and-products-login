import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { LoginAddUpdateComponent } from './components/login-add-update/login-add-update.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SupplierService } from './services/supplier/supplier.service';
import { ProductService } from './services/product/product.service';
import { UserService } from './services/user/user.service';
import { SwalService } from './services/swal/swal.service';
import { SessionService } from './services/session/session.service';
import { LocationGoService } from './services/location/location-go.service';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SuppliersComponent,
    ProductsComponent,
    LoginComponent,
    LoginAddUpdateComponent,
    ProductFormComponent,
    SupplierFormComponent,
    NotFoundComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    SupplierService,
    ProductService,
    UserService,
    SwalService,
    SessionService,
    LocationGoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
