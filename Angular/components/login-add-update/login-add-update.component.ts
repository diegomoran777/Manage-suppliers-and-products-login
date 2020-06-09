import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SwalService } from './../../services/swal/swal.service';
import { IFormsComponents } from '../../interfaces/IFormsComponents';
import { UserService } from './../../services/user/user.service';
import { User } from './../../model/user';
import { SessionService } from './../../services/session/session.service';
import { LocationGoService } from './../../services/location/location-go.service';
import * as crypto from 'crypto-js';


@Component({
  selector: 'app-login-add-update',
  templateUrl: './login-add-update.component.html',
  styleUrls: ['./login-add-update.component.scss']
})
export class LoginAddUpdateComponent implements OnInit, IFormsComponents {

  user = new User();
  private currentUserName: string = sessionStorage.getItem('userName');
  private userName: string = '';
  showForm: boolean = true;
  showSpinner: boolean = false;
  private whiteSpace = /^\s+$/;

  constructor(
    private route: ActivatedRoute,
    private swal: SwalService,
    private service: UserService,
    private session: SessionService,
    private location: LocationGoService
    ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.userName = this.route.snapshot.queryParamMap.get('userName');
    this.loadUsers();
  }

  public isCurrentUser() {
    return this.userName === null || this.userName === this.currentUserName;
  }

  public loadUsers() {
    return this.isCurrentUser() ? this.loadCurrentUser() : this.loadUser();
  }

  public loadCurrentUser(): void {
    this.service.getUserByUserName(this.currentUserName).subscribe( response => {
      this.loadDataUsers(response);
    }, (error) => {
      console.log(error);
    });
  }

  public loadUser(): void {
    this.service.getUserByUserName(this.userName).subscribe( response => {
      this.loadDataUsers(response);
    }, (error) => {
      console.log(error);
    });
  }

  private loadDataUsers(response: User) {
    this.user = response;
    this.user.repeatPass = response.password;
    this.user.unchangedPass = response.password;
    this.user.unchangedUserName = response.userName;
  }

  public clearForm() {
        this.user.id = '';
        this.user.userName = '';
        this.user.password = '';
        this.user.repeatPass = '';
        this.user.role = 'USER';
  }

  public validWhiteSpace(userForm: NgForm) {
    return this.whiteSpace.test(userForm.value.userName) || 
           this.whiteSpace.test(userForm.value.password) || 
           this.whiteSpace.test(userForm.value.repeatPass);
  }

  public matchPass() {
    return this.user.password === this.user.repeatPass;
  }

  public validForm(userForm: NgForm) {
    return userForm.valid && 
    !this.validWhiteSpace(userForm) && 
    this.matchPass(); 
  }

  public updateAddUser(userForm: NgForm): void {
    if(this.validForm(userForm)) {
      return userForm.value.userId === '' ? this.existsUserAndAdd(userForm.value.userName) : this.existsUserAndUpdate(userForm.value.userName);
    } else {
      this.swal.messageInfo("No es posible enviar el formulario, verifique los datos y vuelva a intentarlo");
    }
  }

  public addUser() {
    this.service.addUser(this.user).subscribe( response => {
      this.showSpinnerLoadData(response, " Se ha agregado con exito!")
    }, (error) => {
      console.log(error);
    });
  }

  public updateUser() {
    this.service.updateUser(this.user).subscribe( response => {
      if(this.isCurrentUser()) {
        this.session.createSession(response.userName, response.role);
      }
      this.showSpinnerLoadData(response, " Se ha actualizado con exito!"); 
    }, (error) => {
      console.log(error);
    });
  }

  showSpinnerLoadData(response: User, msj: string): void {
    this.showForm = false;
    this.showSpinner = true;
    setTimeout(() => {
      this.swal.messageSuccess(response.userName + msj);
      this.location.goBack();
    }, 1500);
  }

  private passEncode(): void {
    if(this.user.password !== this.user.unchangedPass) {
      this.user.password = crypto.SHA256(this.user.password).toString();
    }
  }

  public existsUserAndUpdate(userName: string) {
    this.service.existsUserName(userName).subscribe( response => {
      this.canUpdate(response);
    }, (error) => {
      console.log(error);
    });
  }

  public existsUserAndAdd(userName: string) {
    this.service.existsUserName(userName).subscribe( response => {
      this.canAdd(response);
    }, (error) => {
      console.log(error);
    });
  }

  public canAdd(response) {
    return !response ? this.addUser() : 
    this.swal.messageInfo("Ya existe un usuario con ese nombre, pruebe con otro y vuelva a intentarlo!");
  }

  public canUpdate(response) {
    if(response && !this.sameUserName()) {
      this.swal.messageInfo("Ya existe un usuario con ese nombre, pruebe con otro y vuelva a intentarlo!");  
    } else {
      this.passEncode();
      this.updateUser(); 
    }
  }

  public sameUserName(): boolean {
    return this.user.userName.toUpperCase() === this.user.unchangedUserName.toUpperCase();
  }

  public allowedRole(): boolean {
    return sessionStorage.getItem('role') === 'ADMIN';
  }

}