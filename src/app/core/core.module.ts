import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './message.service';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { ProductResolverService } from './product-resolver.service';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    MessageService,
    ProductService,
    AuthService,
    ProductResolverService
  ],
  declarations: [
    LoadingComponent
  ],
  exports: [
    LoadingComponent
  ]
})
export class CoreModule { }
