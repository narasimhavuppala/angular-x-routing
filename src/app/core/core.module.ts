import { NgModule } from '@angular/core';
import { MessageService } from './message.service';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { ProductResolverService } from './product-resolver.service';

@NgModule({
  providers: [
    MessageService,
    ProductService,
    AuthService,
    ProductResolverService
  ]
})
export class CoreModule { }
