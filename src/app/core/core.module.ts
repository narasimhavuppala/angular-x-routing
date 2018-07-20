import { NgModule } from '@angular/core';
import { MessageService } from './message.service';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';

@NgModule({
  providers: [
    MessageService,
    ProductService,
    AuthService
  ]
})
export class CoreModule { }
