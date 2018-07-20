import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFilterPipe } from './product-filter.pipe';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditInfoComponent } from './product-edit-info/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags/product-edit-tags.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ProductListComponent,
    ProductFilterPipe,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ]
})
export class ProductModule { }
