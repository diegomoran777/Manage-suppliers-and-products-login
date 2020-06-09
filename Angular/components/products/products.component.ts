import { Component, OnInit,  ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SwalService } from './../../services/swal/swal.service'
import { ProductService } from './../../services/product/product.service';
import { IProduct } from './../../model/IProduct.model';
import { IMainComponents } from '../../interfaces/IMainComponents';
import { SessionService } from './../../services/session/session.service'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'], 
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .popoverC {
      background: aliceblue;
      color: black;
    }
  `]
})

export class ProductsComponent implements OnInit, IMainComponents {

  productsById: string;
  supplierId: string = '';
  addButton: boolean;
  products: Array<IProduct> = [];
  types: any = [];
  productName: string = '';
  productNumberEx: string = '';
  selectedType: string = '';
  showSpinners: boolean = false;
  showForm: boolean = false;
  listView: boolean = false;
  enter: boolean = true;
  unknownProduct = "https://yt3.ggpht.com/a-/AAuE7mDzizyNwY7MnEDA-4SkyCJTiP-F67ZqS--K_g=s240-mo-c-c0xffffffff-rj-k-no";
  @ViewChild("closeModal") closeModal: ElementRef;

  constructor(
    private route: ActivatedRoute, 
    private service: ProductService, 
    private swal: SwalService,
    private session: SessionService
    ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.productsById = this.route.snapshot.queryParamMap.get('productsById'); 
    this.getProducts();
  }

  public getProducts() {
    if(this.productsById === 'true') {
      this.supplierId = this.route.snapshot.queryParamMap.get('supplierId');
      this.addButton = true;
      this.getProductsBySupplierId();
      this.getTypesById();
    } else {
      this.addButton = false;
      this.getAllProducts();
      this.getAllTypes();
    }
  }

  public getAllProducts() {
    this.service.getProducts().subscribe( response => {
      this.products = response;
    }, (error) => {
      console.log(error);
    });
  }

  public getProductsButton() {
    if(this.productsById === 'true') {
      this.getProductsBySupplierId();
    } else {
      this.getAllProducts();
    }
  }

  public getProductById(productForm: NgForm) {
    if(this.productsById === 'true') {
      this.getProductsBySupplierAndProductId(productForm.value.productId);
    } else {
       this.getProductsById(productForm.value.productId);
    }
  }

  public getProductsById(productId: any) {
    this.service.getProductsById(productId).subscribe( response => {
      this.verifyResponse(response);
    }, (error) => {
      console.log(error);
    });
  }

  public getProductsBySupplierAndProductId(productId: any) {
    this.service.getProductsBySupplierAndProductId(this.supplierId, productId).subscribe( response => {
      this.verifyResponse(response);
    }, (error) => {
      console.log(error);
    });
  }

  public verifyResponse(response) {
    if(response[0] === null) {
      this.swal.messageError("No se ha encontrado el producto");
    } else {
      this.showSpinnersLoadData(response);
    }
  }

  public showSpinnersLoadData(response) {
    setTimeout(() => {
      this.products = response;
      this.closeModal.nativeElement.click();
      this.showSpinners = false;
      setTimeout(() => {
        this.showForm = false;
      }, 1000);
    }, 1500);
    this.showForm = true;
    this.showSpinners = true;
  }

  public getProductsBySupplierId() {
    this.service.getProductsBySupplierId(this.supplierId).subscribe( response => {
      this.products = response;
    }, (error) => {
      console.log(error);
    });
  }

  public getAllTypes() {
    this.service.getAllTypes().subscribe( response => {
      this.types = response;
    }, (error) => {
      console.log(error);
    });
  }

  public getTypesById() {
    this.service.getTypesById(this.supplierId).subscribe( response => {
      this.types = response;
    }, (error) => {
      console.log(error);
    });
  }

  public areYouSure(productId: any) {
    this.swal.confirm("Esta seguro que desea eliminar el producto " + productId + "?")
    .then(response => {
      if (response.value) {
        this.deleteProduct(productId);    
      }
    });
  }

  public deleteProduct(productId: any) {
    this.service.deleteProductById(productId).subscribe( response => {
      if(response) {
        this.swal.messageSuccess("El producto " + productId + " ha sido eliminado");
        this.getAllProducts();
      } else {
        this.swal.messageError("No se ha podido eliminar el producto " + productId);
      }
    });
  }

  public getProductByName(event) {
    this.productName = event.target.value;
    this.searchByParams();
  }

  public getProductByNumber(event) {
    this.productNumberEx = event.target.value;
    this.searchByParams();
  }

  public getProductByType(event) {
    this.selectedType = event.target.value;
    this.searchByParams();
  }

  public searchByParams() {
    this.service.getProductsByParams(
      this.productName, 
      this.productNumberEx, 
      this.selectedType, 
      this.supplierId).subscribe( response => {
        this.products = response;
      }, (error) => {
        console.log(error);
      });
  }

  public changeView() {
    if(this.listView) {
      this.listView = false;
      this.enter = true;
    } else {
      this.listView = true;
      setTimeout(() => {
        this.enter = false;
      }, 1500);
    }
  }

  public isUknownProduct(photo) {
    return photo === '---' ? this.unknownProduct : photo;
  }

}
