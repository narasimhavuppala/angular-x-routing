import { NgModule } from '@angular/core';
import { MessageService } from './message.service';
import { ProductService } from './product.service';

@NgModule({
  providers: [
    MessageService,
    ProductService
  ]
})
export class CoreModule { }
