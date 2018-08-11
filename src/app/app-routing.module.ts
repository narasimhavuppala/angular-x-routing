import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { Page404Component } from './page-404/page-404.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { AuthGuardService } from 'app/core/auth-guard.service';

const routes: Routes = [
  {
    path: 'welcome',
    component: HomeComponent
  },
  {
    // LAZY LOADING
    // -- This object is here in sync with version 3 of route configuration in product-routing.module
    path: 'products',
    // path is relative to index.html
    loadChildren: 'app/product/product.module#ProductModule',
    canLoad: [AuthGuardService]
  },
  {
    path: 'tooltip',
    component: TooltipComponent
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

// HTML5 style navigation vs hash { useHash: true } as second argument to .forRoot()
// https://angular.io/guide/router#set-the-base-href
// https://angular.io/guide/router#appendix-locationstrategy-and-browser-url-styles
// https://angular.io/guide/deployment#routed-apps-must-fallback-to-indexhtml

@NgModule({
  imports: [
    // .forRoot() should only be used 1 time in the application , here we use enableTracing for debug info (could use environment debug, so just use in debug mode(?))
    RouterModule.forRoot(routes)  // send in { enableTracing: true } as second argument
    // send in { preloadingStrategy: PreloadAllModules | } import types from '@angular/router'
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
