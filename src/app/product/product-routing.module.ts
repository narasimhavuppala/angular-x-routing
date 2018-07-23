import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditInfoComponent } from './product-edit-info/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags/product-edit-tags.component';
import { ProductResolverService } from 'app/core/product-resolver.service';

const routes: Routes = [
  {
    // A component-less route
    // The router will then NOT look for a router-outlet in product-list.component, it will instead put the top lever children in app.component:s router outlet
    // The bottom level children, under :id/edit will however still be put in router-outlet in product-edit.component
    path: 'products',
    data: {
      // Must contain static data
      pageTitle: 'Product List'
    },
    children: [
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
        children: [
          {
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
    ]
  }//,
  // 
  //    WE PUT THESE AS CHILDRE TO THE PRODUCT ROUTE INSTEAD
  //    BUT THE COMMENTS BELLOW CONTAINS USEFUL INFORMATION
  // {
  //   // id could be named anything, can have several (but they need a unique name)
  //   path: 'products/:id',
  //   component: ProductDetailComponent,
  //   resolve: {
  //     // can have multiple, must have unique name (within this route)
  //     product: ProductResolverService
  //   }
  // },
  // {
  //   path: 'products/:id/edit',
  //   component: ProductEditComponent,
  //   resolve: {
  //     // If the child routes work with the same data, we can have the resolver here in the parent. See product-edit-info.component for how to retrieve the data
  //     // But if the child routes work with different data, it is better to use a resolver in their configuration
  //     product: ProductResolverService
  //   },
  //   // Children array, associated with the parent route
  //   // The parent routed component will have the <router-outlet>
  //   // Child routes extend the path of the parent route
  //   children: [
  //     {
  //       // When user navigates to products/n/edit , info route will be loaded in the nested router-outlet
  //       path: '',
  //       redirectTo: 'info',
  //       pathMatch: 'full'
  //     },
  //     {
  //       // products/n/edit/info
  //       path: 'info',
  //       component: ProductEditInfoComponent
  //     },
  //     {
  //       // products/n/edit/tags
  //       path: 'tags',
  //       component: ProductEditTagsComponent
  //     }
  //   ]
  // }
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
