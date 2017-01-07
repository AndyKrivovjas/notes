import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router'
import { HttpService } from 'http.service'

declare var jQuery:any;
declare var window:any;

@Injectable()
export class AuthService {

  headers: Headers;
  response: any;

  constructor(private http: HttpService){

  }

  ping() {
    
  }



}
