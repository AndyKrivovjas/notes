import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router'
import { CookieService } from 'angular2-cookie/core';
import 'rxjs/add/operator/map';

declare var jQuery:any;
declare var window:any;

@Injectable()
export class HttpService {

  headers: Headers;
  response: any;

  constructor(private _http: Http, private _router: Router, private _cookieService: CookieService){

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.headers.append('X-CSRFToken', this._cookieService.get('csrftoken'));

  }

  post(url:string, data:any = {}, successCallback:any = function(){}, errorCalback:any = function(){}) {

    if(window.localStorage.access_token) {
      data['access_token'] = window.localStorage.access_token;
    }

    return this._http.post('api/' + url, jQuery.param(data), { headers: this.headers })
      .map(response => response.json())
      .subscribe(
        response => this.response = this._successHandler(response, successCallback),
        error => this._errorHandler(error.json(), errorCalback)
      );

  }

  private _successHandler(response, callback:any = function(){}) {

    if(response.success && response.success.access_token) {
      window.localStorage.access_token = response.success.access_token;

    }

    window.localStorage.authenticated = true;
    callback(response.success);
  }

  private _errorHandler(response, callback:any = function(){}) {

    if (response.error) {
      //if access_token isn't valid
      if (response.error.error_data.error_code === 5) {
        window.localStorage.authenticated = false;
        this._router.navigate(['/login']);
      }
    }

    callback(response.error);

  }

}
