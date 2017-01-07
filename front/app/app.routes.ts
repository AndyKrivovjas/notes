import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/auth.component';


const mainRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    children: [

    ]
  },
];

export const mainRouting: ModuleWithProviders = RouterModule.forRoot(mainRoutes);
