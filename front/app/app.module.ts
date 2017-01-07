import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { HttpService } from './services/http.service'
import { CookieService } from 'angular2-cookie/core';
import { MomentModule } from 'angular2-moment/module';
import { MaterializeDirective } from "angular2-materialize";

import { mainRouting } from './app.routes';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/auth.component';
import { HomeComponent } from './components/home.component';
import { HeaderComponent } from './components/header.component'
import { FooterComponent } from './components/footer.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    mainRouting,
    HttpModule,
    MomentModule
  ],
  declarations: [
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AppComponent,
    MaterializeDirective
  ],
  providers: [ HttpService, CookieService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
