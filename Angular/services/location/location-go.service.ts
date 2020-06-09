import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocationGoService {

  constructor(
    private location: Location,
    private router: Router 
  ) { }

  public goBack() {
    this.location.back();
  }

  public goSupplier() {
    this.router.navigate(['/suppliers']);
  }

  public goToTheBeginning() {
    this.router.navigate(['/']);
  }
}
