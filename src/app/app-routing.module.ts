import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app-routes';

const routerConfig = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    routerConfig
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
