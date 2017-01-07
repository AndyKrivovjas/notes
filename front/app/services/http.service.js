"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var core_2 = require('angular2-cookie/core');
require('rxjs/add/operator/map');
var HttpService = (function () {
    function HttpService(_http, _router, _cookieService) {
        this._http = _http;
        this._router = _router;
        this._cookieService = _cookieService;
        this.headers = new http_1.Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.headers.append('X-CSRFToken', this._cookieService.get('csrftoken'));
    }
    HttpService.prototype.post = function (url, data, successCallback, errorCalback) {
        var _this = this;
        if (data === void 0) { data = {}; }
        if (successCallback === void 0) { successCallback = function () { }; }
        if (errorCalback === void 0) { errorCalback = function () { }; }
        if (window.localStorage.access_token) {
            data['access_token'] = window.localStorage.access_token;
        }
        return this._http.post('api/' + url, jQuery.param(data), { headers: this.headers })
            .map(function (response) { return response.json(); })
            .subscribe(function (response) { return _this.response = _this._successHandler(response, successCallback); }, function (error) { return _this._errorHandler(error.json(), errorCalback); });
    };
    HttpService.prototype._successHandler = function (response, callback) {
        if (callback === void 0) { callback = function () { }; }
        if (response.success && response.success.access_token) {
            window.localStorage.access_token = response.success.access_token;
        }
        window.localStorage.authenticated = true;
        callback(response.success);
    };
    HttpService.prototype._errorHandler = function (response, callback) {
        if (callback === void 0) { callback = function () { }; }
        if (response.error) {
            //if access_token isn't valid
            if (response.error.error_data.error_code === 5) {
                window.localStorage.authenticated = false;
                this._router.navigate(['/login']);
            }
        }
        callback(response.error);
    };
    HttpService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, core_2.CookieService])
    ], HttpService);
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map