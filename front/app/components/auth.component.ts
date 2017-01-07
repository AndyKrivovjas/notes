import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

declare var Materialize:any;
declare var window:any;

@Component({
  selector: 'vk',
  moduleId: module.id,
  templateUrl: '../templates/login.component.html',
})
export class LoginComponent implements OnInit {

  private username: string;
  private password: string;

  constructor(private router: Router){

  }

  ngOnInit() {
    var _this = this;


  }

  authenticate() {
    var _this = this;



  }

}
