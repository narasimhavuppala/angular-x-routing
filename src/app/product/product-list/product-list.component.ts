import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'app/data/product.model';
import { ProductService } from 'app/core/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  listFilter: string;
  errorMessage: string;
  products: ProductModel[];

  constructor(
    private productService: ProductService
  ) { }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

}
