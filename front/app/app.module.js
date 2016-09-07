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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var http_service_1 = require('./services/http.service');
var core_2 = require('angular2-cookie/core');
var module_1 = require('angular2-moment/module');
var angular2_materialize_1 = require("angular2-materialize");
var app_routes_1 = require('./app.routes');
var app_component_1 = require('./app.component');
var auth_component_1 = require('./components/auth.component');
var home_component_1 = require('./components/home.component');
var header_component_1 = require('./components/header.component');
var footer_component_1 = require('./components/footer.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                app_routes_1.mainRouting,
                http_1.HttpModule,
                module_1.MomentModule
            ],
            declarations: [
                auth_component_1.LoginComponent,
                home_component_1.HomeComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                app_component_1.AppComponent,
                angular2_materialize_1.MaterializeDirective
            ],
            providers: [http_service_1.HttpService, core_2.CookieService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map