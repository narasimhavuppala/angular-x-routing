import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductListComponent,
    data: {
      // Must contain static data
      pageTitle: 'Product List'
    }
  },
  {
    // id could be named anything, can have several (but they need a unique name)
    path: 'products/:id',
    component: ProductDetailComponent
  },
  {
    path: 'products/:id/edit',
    component: ProductEditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductRoutingModule { }
