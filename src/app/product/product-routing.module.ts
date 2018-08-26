import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditInfoComponent } from './product-edit-info/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags/product-edit-tags.component';
import { ProductResolverService } from 'app/core/product-resolver.service';
// import { AuthGuardService } from 'app/core/auth-guard.service';
import { ProductGuardService } from 'app/core/product-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {

    path: ':id',
    component: ProductDetailComponent,
    resolve: {
      product: ProductResolverService
    }
  },
  {
    path: ':id/edit',
    component: ProductEditComponent,
    resolve: {
      product: ProductResolverService
    },
    canDeactivate: [
      ProductGuardService
    ],
    children: [
      {
        // Redirect
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {

        path: 'info',
        component: ProductEditInfoComponent
      },
      {

        path: 'tags',
        component: ProductEditTagsComponent
      }
    ]
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
