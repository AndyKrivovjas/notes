import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

declare var window:any;

@Component({
  selector: 'header-app',
  moduleId: module.id,
  templateUrl: '../templates/header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
    var _this = this;


  }

  logout() {
    window.localStorage.access_token = '';
    this.router.navigate(['/login']);
  }

}
