import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ProductModel } from 'app/data/product.model';
import { ProductService } from 'app/core/product.service';
import { MessageService } from 'app/core/message.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  pageTitle = 'Edit Product';
  errorMessage: string;
  product: ProductModel;
  productSubscription: Subscription;
  routeParamSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private messageService: MessageService
  ) { 
    this.onGetProductId = this.onGetProductId.bind(this);
  }

  ngOnInit() {
    // We need to subscribe to params here (instead of using snapshot), so new data is fetched if user clicks create product from the top menu (a new id with value 0 is sent with the route)
    this.routeParamSubscription = this.activatedRoute.params.subscribe(this.onGetProductId);
  }

  ngOnDestroy() {
    this.routeParamSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }

  private onGetProductId(params) {
    const id = +params['id'];
    this.pageTitle = id === 0 ? 'Create Product' : this.pageTitle;
    this.productSubscription = this.productService.getProduct(id).subscribe(p => this.product = p);
  }
}
