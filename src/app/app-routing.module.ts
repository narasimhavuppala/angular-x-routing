import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { Page404Component } from './page-404/page-404.component';
import { AuthGuardService } from 'app/core/auth-guard.service';

const routes: Routes = [
  {
    path: 'welcome',
    component: HomeComponent
  },
  {
    path: 'products',
    loadChildren: 'app/product/product.module#ProductModule',
    //canActivate: [AuthGuardService]
    canLoad: [AuthGuardService]
  },
  {
    path: '',
    redirectTo: 'welcome',                  // We can only do one redirecti, meaning it would not work to redirect again from 'welcome' to another path
    pathMatch: 'full'                       // the path must be completly empty, can also use 'prefix', https://angular.io/guide/router#redirecting-routes
  },
  {
    path: '**',
    component: Page404Component             // The order of these routes are important, as for example this wildcard matches everything, see also comments in app.module
  }
];



@NgModule({
  imports: [

    RouterModule.forRoot(routes, { useHash: true, enableTracing: true })  // send in { enableTracing: true } as second argument
    // send in { preloadingStrategy: PreloadAllModules | } import types from '@angular/router'
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
