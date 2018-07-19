import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app-routes';

// HTML5 style navigation vs hash { useHash: true } as second argument to .forRoot()
// https://angular.io/guide/router#set-the-base-href
// https://angular.io/guide/router#appendix-locationstrategy-and-browser-url-styles
// https://angular.io/guide/deployment#routed-apps-must-fallback-to-indexhtml
const routerConfig = RouterModule.forRoot(routes);                                      // .forRoot() should only be used 1 time in the application


@NgModule({
  imports: [
    routerConfig
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
