import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductResolverService } from 'app/core/product-resolver.service';

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
    component: ProductDetailComponent,
    resolve: {
      // can have multiple, must have unique name (within this route)
      product: ProductResolverService
    }
  },
  {
    path: 'products/:id/edit',
    component: ProductEditComponent,
    resolve: {
      product: ProductResolverService
    }
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
