import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginAddUpdateComponent } from './components/login-add-update/login-add-update.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { ProductsComponent } from './components/products/products.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/all', component: ProductsComponent },
  { path: 'product-form', component: ProductFormComponent },
  { path: 'supplier-form', component: SupplierFormComponent },
  { path: 'login-form', component: LoginAddUpdateComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
