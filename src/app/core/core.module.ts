import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from './message.service';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { ProductResolverService } from './product-resolver.service';
import { AuthGuardService } from './auth-guard.service';
import { LoadingComponent } from './loading/loading.component';
import { ProductGuardService } from './product-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    MessageService,
    ProductService,
    AuthService,
    ProductResolverService,
    AuthGuardService,
    ProductGuardService
  ],
  declarations: [
    LoadingComponent
  ],
  exports: [
    LoadingComponent
  ]
})
export class CoreModule { }
