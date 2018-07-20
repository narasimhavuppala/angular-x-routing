import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductModel } from 'app/data/product.model';
import { ProductService } from 'app/core/product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  listFilter: string;
  errorMessage: string;
  products: ProductModel[];
  productsSubscription: Subscription;

  constructor(
    private productService: ProductService
  ) { }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  ngOnInit() {
    this.productsSubscription = this.productService.getProducts().subscribe(p => this.products = p);
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
