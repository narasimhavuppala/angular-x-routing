import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { ProductModel } from 'app/data/product.model';
import { ProductService } from 'app/core/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle = 'Product';
  product: ProductModel;
  productSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  // This is a great hook to get data for the component, prefer it over doing it in the constructor
  ngOnInit() {
    // use paramMap instead: https://stackoverflow.com/questions/47809357/angular-4-5-route-parammap-vs-params , https://angular.io/api/router/ParamMap , https://angular.io/guide/router#activated-route-in-action
    const id = +this.activatedRoute.snapshot.params['id'];
    this.productSubscription = this.productService.getProduct(id).subscribe(p => this.product = p);

    // getting queryParam from code
    console.log(this.activatedRoute.snapshot.queryParamMap.get('showImage'));
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

}
