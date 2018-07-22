import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer';

import { ProductModel } from 'app/data/product.model';
import { ProductService } from 'app/core/product.service';
import { MessageService } from 'app/core/message.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  pageTitle = '';
  errorMessage: string;
  product: ProductModel;
  // productSubscription: Subscription;
  // routeParamSubscription: Subscription;
  activatedRouteSubscription: Subscription;
  productUpdatedSubscription: Subscription;
  productDeleteSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private messageService: MessageService
  ) {
    // this.onGetProductId = this.onGetProductId.bind(this);
  }

  ngOnInit() {
    // We need to subscribe to params here (instead of using snapshot), so new data is fetched if user clicks create product from the top menu (a new id with value 0 is sent with the route, AND this component is NOT recreated)
    // this.routeParamSubscription = this.activatedRoute.params.subscribe(this.onGetProductId);

    // use paramMap instead: https://stackoverflow.com/questions/47809357/angular-4-5-route-parammap-vs-params , https://angular.io/api/router/ParamMap , https://angular.io/guide/router#activated-route-in-action
    // this.routeParamSubscription = this.activatedRoute.paramMap.subscribe(this.onGetProductId);

    // We no longer get the id and fetch the product via productService since we are using a resolver instead

    // subscribing to resolve
    this.activatedRouteSubscription = this.activatedRoute.data.subscribe(data => this.product = data['product']);
  }

  ngOnDestroy() {
    // this.routeParamSubscription.unsubscribe();
    // this.productSubscription.unsubscribe();

    this.activatedRouteSubscription.unsubscribe();

    if (this.productUpdatedSubscription) {
      this.productUpdatedSubscription.unsubscribe();
    }

    if (this.productDeleteSubscription) {
      this.productDeleteSubscription.unsubscribe();
    }
  }

  saveProduct() {
    // Doing the long hand version

    const observer: Observer<ProductModel> = {
      next: (product: ProductModel) => this.router.navigate(['/products', product.id]),
      error: (error: any) => console.log(error),
      complete: () => console.log('complete')
    };

    this.productUpdatedSubscription = this.product.id !== 0 ?
      this.productService.updateProduct(this.product).subscribe(observer) :
      this.productService.createProduct(this.product).subscribe(observer);
  }

  deleteProduct() {
    // Doing the shorthand version, just next callback
    this.productDeleteSubscription = this.productService.deleteProduct(this.product.id).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }

  // private onGetProductId(params: ParamMap) {
  //   const id = +params.get('id');
  //   this.productSubscription = this.productService.getProduct(id).subscribe((product) => {
  //     this.product = JSON.parse(JSON.stringify(product)); // we edit on a copy, in case user cancels
  //     this.pageTitle = id === 0 ? 'Create Product' : `Edit ${product.productName}`;
  //   });
  // }
}
