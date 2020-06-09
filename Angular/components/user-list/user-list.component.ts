import { Component, OnInit } from '@angular/core';
import { SwalService } from './../../services/swal/swal.service'
import { IUser } from './../../model/IUser.model';
import { User } from './../../model/user'; 
import { UserService } from './../../services/user/user.service';
import { SessionService } from './../../services/session/session.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Array<IUser> = [];
  user = new User();
  currentUser: string = sessionStorage.getItem('userName');
  userName: string = '';
  userNameParam: string = '';
  roleParam: string = '';

  constructor(
    private swal: SwalService,
    private service: UserService,
    private session: SessionService
  ) { }

  ngOnInit(): void {
    this.session.verifyUser();
    this.getUsers();
  }

  public getUsers() {
    this.service.getUsers().subscribe( response => {
      this.users = response;
    }, (error) => {
      console.log(error);
    });
  }

  public changeRole(e) {
    if(e.target.checked) {
      setTimeout(() => {
        this.userName = e.target.value;
        this.getUserByUserName(this.userName);
      }, 500);
    }
  }

  public getUserByUserName(userName:  string) {
    this.service.getUserByUserName(userName).subscribe( response => {
      this.user = response;
      this.user.role = this.whichIsRole(this.user.role);
      this.updateUser();
    }, (error) => {
      console.log(error);
    });
  }

  public updateUser() {
    this.service.updateUser(this.user).subscribe( response => {
      this.getUsers();
    }, (error) => {
      console.log(error);
    });
  }

  public whichIsRole(role: string) {
    return role === 'ADMIN' ? 'USER' : 'ADMIN';
  }

  public deleteUser(userId: string, userName: string) {
    this.service.deleteUserById(userId).subscribe( response => {
      if(response) {
        this.swal.messageSuccess("El usuario " + userName + " ha sido eliminado");
        this.getUsers();
      } else {
        this.swal.messageError("No se ha podido eliminar el usuario " + userName);
      }
    }, (error) => {
      console.log(error);
    })
  }

  public getUsersByUserName(event) {
    this.userNameParam = event.target.value;
    this.searchByParams();
  }

  public getUsersByRole(event) {
    this.roleParam = event.target.value;
    this.searchByParams();
  }

  public searchByParams() {
    this.service.getUsersByParams(this.userNameParam, this.roleParam).subscribe( response => {
      this.users = response;
    }, (error) => {
      console.log(error);
    });
  }

}
