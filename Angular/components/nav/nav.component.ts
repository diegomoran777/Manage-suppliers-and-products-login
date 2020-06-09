import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  activateRole:string;
  userName:string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.activateRole = sessionStorage.getItem('role');
    this.userName = sessionStorage.getItem('userName');
  }

}
