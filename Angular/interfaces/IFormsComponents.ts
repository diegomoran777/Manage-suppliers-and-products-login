import { NgForm } from '@angular/forms';

export interface IFormsComponents {
    showSpinnerLoadData(response, msj: string): void;
    validWhiteSpace(userForm: NgForm): boolean;
    validForm(userForm: NgForm): boolean;
}