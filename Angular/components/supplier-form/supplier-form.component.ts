import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SwalService } from './../../services/swal/swal.service'
import { SupplierService } from './../../services/supplier/supplier.service';
import { Supplier } from './../../model/supplier';
import { IFormsComponents } from '../../interfaces/IFormsComponents';
import { SessionService } from './../../services/session/session.service';
import { LocationGoService } from './../../services/location/location-go.service';


@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit, IFormsComponents {

  private supplierId: string = '';
  supplier = new Supplier(); 
  supplierResponse = new Supplier();
  showForm: boolean = true;
  showSpinner: boolean = false;
  private whiteSpace = /^\s+$/;

  constructor(
    private location: LocationGoService, 
    private service: SupplierService, 
    private route: ActivatedRoute, 
    private swal: SwalService, 
    private session: SessionService
    ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.supplierId = this.route.snapshot.queryParamMap.get('supplierId'); 
    this.updateOrAdd();
  }

  public isEmptyId() {
    return this.supplierId === '';
  }

  public updateOrAdd() {
    return !this.isEmptyId() ? this.getSupplier() : false;
  }

  public validWhiteSpace(supplierForm: NgForm) {
    return this.whiteSpace.test(supplierForm.value.name) || 
           this.whiteSpace.test(supplierForm.value.email);
  }

  public validForm(supplierForm: NgForm) {
    return supplierForm.valid && !this.validWhiteSpace(supplierForm);
  }

  public updateAddSupplier(supplierForm: NgForm) {
    if(this.validForm(supplierForm)) {
      return this.isEmptyId() ? this.addSupplier() : this.updateSupplier();
    } else {
      this.swal.messageInfo("No es posible enviar el formulario, verifique los datos y vuelva a intentarlo");
    }
  }

  public getSupplier() {
    this.service.getSupplier(this.supplierId).subscribe( response => {
      this.supplier = response;
    }, (error) => {
      console.log(error);
    });
  }

  public addSupplier() {
    this.service.addSupplier(this.supplier).subscribe( response => {
      this.showSpinnerLoadData(response, " se ha agregado con exito!");
    }, (error) => {
      console.log(error);
    });
  }

  public updateSupplier() {
    this.service.updateSupplier(this.supplier).subscribe( response => {
      this.showSpinnerLoadData(response, " se ha actualizado con exito!");      
    }, (error) => {
      console.log(error);
    });
  }

  public showSpinnerLoadData(response, msj: string) {
    this.showForm = false;
    this.showSpinner = true;
    setTimeout(() => {
      this.supplierResponse = response;
      this.swal.messageSuccess(this.supplierResponse.name + msj);
      this.location.goBack();
    }, 1500);
  }

}
