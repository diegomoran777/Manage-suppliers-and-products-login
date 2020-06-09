import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SwalService } from './../../services/swal/swal.service'
import { ISupplier } from './../../model/ISupplier.model';
import { SupplierService } from './../../services/supplier/supplier.service';
import { IMainComponents } from '../../interfaces/IMainComponents';
import { SessionService } from './../../services/session/session.service';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit, IMainComponents {

  suppliers: Array<ISupplier> = [];
  showSpinners: boolean = false;
  showForm: boolean = false;
  supplierName: string = '';
  supplierNumberEx: string = '';
  @ViewChild("closeModal") closeModal: ElementRef;

  constructor(
    private service: SupplierService, 
    private swal: SwalService, 
    private session: SessionService
    ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.getSuppliers();
  }

  public getSuppliers() {
    this.service.getSuppliers().subscribe( response => {
      this.suppliers = response;
    }, (error) => {
      console.log(error);
      this.swal.messageInfo('No se han podido cargar los proveedores');
    });
  }

  public getSupplierById(supplierForm: NgForm) {
    this.service.getSupplierById(supplierForm.value.supplierId).subscribe( response => {
      if(response[0] === null) {
        this.swal.messageError('No se ha encontrado el proveedor');
      } else {
        this.showSpinnersLoadData(response);
      }
    }, (error) => {
      console.log(error);
    });
  }

  public showSpinnersLoadData(response) {
    setTimeout(() => {
      this.suppliers = response;
      this.closeModal.nativeElement.click();
      this.showSpinners = false;
      setTimeout(() => {
        this.showForm = false;
      }, 1000);
    }, 1500);
    this.showForm = true;
    this.showSpinners = true;
  }

  public deleteSupplier(supplierId: any) {
    this.service.deleteSupplierById(supplierId).subscribe( response => {
      if(response) {
        this.swal.messageSuccess("El proveedor " + supplierId + " ha sido eliminado");
        this.getSuppliers();
      } else {
        this.swal.messageError("No se ha podido eliminar el proveedor " + supplierId);
      }
    });
  }

  public getSupplierByName(event) {
    this.supplierName = event.target.value;
    this.searchByParams();
  }

  public getSupplierByNumber(event) {
    this.supplierNumberEx = event.target.value;
    this.searchByParams();
  }

  public searchByParams() {
    this.service.getSuppliersByParams(this.supplierName, this.supplierNumberEx).subscribe( response => {
      this.suppliers = response;
    }, (error) => {
      console.log(error);
    });
  }

}
