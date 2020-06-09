import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SwalService } from './../../services/swal/swal.service'
import { ProductService } from './../../services/product/product.service';
import { Product } from './../../model/product';
import { Supplier } from './../../model/supplier';
import { SupplierService } from './../../services/supplier/supplier.service';
import { IFormsComponents } from '../../interfaces/IFormsComponents';
import { SessionService } from './../../services/session/session.service';
import { LocationGoService } from './../../services/location/location-go.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, IFormsComponents {

  supplierId: string = '';
  productId: string = '';
  supplier = new Supplier();
  product = new Product();
  showForm: boolean = true;
  showSpinner: boolean = false;
  private whiteSpace = /^\s+$/;

  constructor(
    private location: LocationGoService, 
    private supplierService: SupplierService, 
    private service: ProductService, 
    private route: ActivatedRoute, 
    private swal: SwalService, 
    private session: SessionService
    ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.productId = this.route.snapshot.queryParamMap.get('productId');
    this.updateOrAdd();
  }

  public isEmptyId() {
    return this.productId === '';
  }

  private updateOrAdd() {
    if(this.isEmptyId()) {
      this.supplierId = this.route.snapshot.queryParamMap.get('supplierId');
      this.getSupplierById();
      this.product.setSupplierId(this.supplierId);
    } else {
      this.getProduct();
    }
  }

  public validWhiteSpace(productForm: NgForm) {
    return this.whiteSpace.test(productForm.value.productType) || 
           this.whiteSpace.test(productForm.value.productName);
  }

  public validForm(productForm: NgForm) {
    return productForm.valid && !this.validWhiteSpace(productForm);
  }

  public updateAddProduct(productForm: NgForm) {
    if(this.validForm(productForm)) {
      return this.isEmptyId() ? this.addProduct() : this.updateProduct();
     } else {
      this.swal.messageInfo("No es posible enviar el formulario, verifique los datos y vuelva a intentarlo");
    } 
  }

  private getProduct() {
    this.service.getProduct(this.productId).subscribe( response => {
      this.product = response;
    }, (error) => {
      console.log(error);
    });
  }

  private addProduct() {
    this.service.addProduct(this.product).subscribe( response => {
      this.showSpinnerLoadData(response, " se ha agregado con exito!");
    }, (error) => {
      console.log(error);
    });
  }

  private updateProduct() {
    this.service.updateProduct(this.product).subscribe( response => {
      this.showSpinnerLoadData(response, " se ha actualizado con exito!");
    }, (error) => {
      console.log(error);
    });
  }

  public showSpinnerLoadData(response, msj: string) {
    this.showForm = false;
    this.showSpinner = true;
    setTimeout(() => {
      this.swal.messageSuccess(response.name + msj);
      this.location.goBack();
    }, 1500);
  }

  private getSupplierById() {
    this.supplierService.getSupplier(this.supplierId).subscribe( response => {
      this.supplier = response;
      this.product.setSupplierName(this.supplier.name);
    }, (error) => {
      console.log(error);
    });
  }

}
