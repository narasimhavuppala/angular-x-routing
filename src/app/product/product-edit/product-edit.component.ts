import { Component, OnInit } from '@angular/core';

import { ProductModel } from 'app/data/product.model';
import { ProductService } from 'app/core/product.service';
import { MessageService } from 'app/core/message.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  pageTitle = 'Product Edit';
  errorMessage: string;
  product: ProductModel;

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) { }

  // TODO

  ngOnInit() {
  }

}
