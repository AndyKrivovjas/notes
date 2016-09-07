import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

declare var jQuery:any;
declare var window:any;

@Component({
  selector: 'notes-home',
  moduleId: module.id,
  templateUrl: '../templates/home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {


  }

  ngOnInit() {


  }

}
