import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ProductModel } from 'app/data/product.model';
import { ProductService } from 'app/core/product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  pageTitle = '';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  listFilter: string;
  errorMessage: string;
  products: ProductModel[];
  productsSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  ngOnInit() {
    this.pageTitle = this.activatedRoute.snapshot.data['pageTitle']; // we never subscribe to data since it is always static
    this.productsSubscription = this.productService.getProducts().subscribe(p => this.products = p);

    this.listFilter = this.activatedRoute.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.activatedRoute.snapshot.queryParamMap.get('showImage') === 'true';
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
