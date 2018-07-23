import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-edit-info',
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {

  errorMessage: string;
  product = { id: 1, productName: 'test', productCode: 'test' };

  constructor() { }

  ngOnInit() {
  }

}
