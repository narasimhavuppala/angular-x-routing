import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { Page404Component } from './page-404/page-404.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'welcome',                  // We can only do one redirecti, meaning it would not work to redirect again from 'welcome' to another path
    pathMatch: 'full'                       // the path must be completly empty, can also use 'prefix', https://angular.io/guide/router#redirecting-routes
  },
  {
    path: '**',
    component: Page404Component             // The order of these routes are important, as for example this wildcard matches everything
  }
];

// HTML5 style navigation vs hash { useHash: true } as second argument to .forRoot()
// https://angular.io/guide/router#set-the-base-href
// https://angular.io/guide/router#appendix-locationstrategy-and-browser-url-styles
// https://angular.io/guide/deployment#routed-apps-must-fallback-to-indexhtml

@NgModule({
  imports: [
    RouterModule.forRoot(routes)                                      // .forRoot() should only be used 1 time in the application
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
