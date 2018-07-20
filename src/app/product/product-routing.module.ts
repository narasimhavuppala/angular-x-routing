import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent
  }
];

const routerConfig = RouterModule.forChild(routes);

@NgModule({
  imports: [
    routerConfig
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule { }
