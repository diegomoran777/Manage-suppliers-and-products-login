import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiUrl } from './../../API_URL/api_url';
import { Supplier } from './../../model/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private API_URL = ApiUrl.SUPPLIER;

  constructor(private http: HttpClient) { }

  public getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.API_URL}/suppliers`).pipe(
      catchError(this.errorHandler)
    );
  }

  public getSupplierById(supplierId: any): Observable<Supplier[]> {
    return this.http.post<Supplier[]>(`${this.API_URL}/getsupplierid`, {id: supplierId}).pipe(
      catchError(this.errorHandler)
    );
  }

  public getSupplier(supplierId: any): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.API_URL}/get-supplier`, {id: supplierId}).pipe(
      catchError(this.errorHandler)
    );
  }

  public deleteSupplierById(supplierId: any) {
    return this.http.delete(`${this.API_URL}/${supplierId}`, {responseType: 'text'}).pipe(
      catchError(this.errorHandler)
    );
  }

  public addSupplier(supplier: Supplier): Observable<Supplier> {
    const formData = this.formDataCreate(supplier, false);
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post<Supplier>(`${this.API_URL}/save-update`, formData, {headers: headers});
  }

  public updateSupplier(supplier: Supplier): Observable<Supplier> {
    const formData = this.formDataCreate(supplier, true);
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    return this.http.post<Supplier>(`${this.API_URL}/save-update`, formData, {headers: headers});
  }

  private formDataCreate(supplier: Supplier, addUpdate: boolean) {
    const formData = new FormData();
    formData.append("numberExtern", this.isUndefined(supplier.numberExtern));
    formData.append("name", this.isUndefined(supplier.name));
    formData.append("address", this.isUndefined(supplier.address));
    formData.append("telephone", this.isUndefined(supplier.telephone));
    formData.append("email", supplier.email);
    if(addUpdate) {
      formData.append("id", supplier.id);
      return formData;
    } else {
      return formData;
    }
  }

  public isUndefined(attr: any) {
    return attr !== '' && attr !== undefined ? attr : '---';
  }

  public getSuppliersByParams(supplierName: string, numberExtern: string): Observable<Supplier[]> {
    return this.http.post<Supplier[]>(`${this.API_URL}/search-by-params`, {searchByName: supplierName, searchByNumberExtern: numberExtern}).pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log("Error en el servicio");
    return throwError(error);
  }
}
