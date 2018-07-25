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

  private dataIsValid: { [key: string]: boolean } = {};         // { 'key': true }
  private originalProduct: ProductModel;

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
    console.log('INIT');

    // We need to subscribe to params here (instead of using snapshot), so new data is fetched if user clicks create product from the top menu (a new id with value 0 is sent with the route, AND this component is NOT recreated)
    // this.routeParamSubscription = this.activatedRoute.params.subscribe(this.onGetProductId);

    // use paramMap instead: https://stackoverflow.com/questions/47809357/angular-4-5-route-parammap-vs-params , https://angular.io/api/router/ParamMap , https://angular.io/guide/router#activated-route-in-action
    // this.routeParamSubscription = this.activatedRoute.paramMap.subscribe(this.onGetProductId);

    // We no longer get the id and fetch the product via productService since we are using a resolver instead

    // subscribing to resolve
    // for just getting it via snapshot.data without subscription, see product-detail.component
    this.activatedRouteSubscription = this.activatedRoute.data.subscribe((data) => {
      this.product = data['product'];
      this.originalProduct = JSON.parse(JSON.stringify(this.product));
      this.pageTitle = this.product.id === 0 ? 'Create Product' : `Edit ${this.product.productName}`;
    });
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

  isDirty() {
    return JSON.stringify(this.product) !== JSON.stringify(this.originalProduct);
  }

  saveProduct() {
    // Doing the long hand version

    if (!this.isValid()) {
      return;
    }

    const observer: Observer<number> = {
      next: (id: number) => {
        this.reset();
        this.router.navigate(['/products', id]);
      },
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
      this.reset();
      this.router.navigate(['/products']);
    });
  }

  isValid(path?: string) {
    if(!this.product) {
      return false;
    }

    this.validate();

    if (path) {
      return this.dataIsValid[path];
    }
    
    return (this.dataIsValid && Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  private validate() {

    // Manual validation
    // This component and its children (product-edit-info and product-edit-tags) gets the same instance
    // So it doesnt matter that the child components and their form validation state is destroyed, 
    // we still have access to the product instance here.

    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.product.productName &&
      this.product.productName.length >= 3 &&
      this.product.productCode) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (this.product.category &&
      this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }

  private reset() {
    this.dataIsValid = null;
    this.originalProduct = null;
    this.product = null;
  }

  // private onGetProductId(params: ParamMap) {
  //   const id = +params.get('id');
  //   this.productSubscription = this.productService.getProduct(id).subscribe((product) => {
  //     this.product = JSON.parse(JSON.stringify(product)); // we edit on a copy, in case user cancels
  //     this.pageTitle = id === 0 ? 'Create Product' : `Edit ${product.productName}`;
  //   });
  // }
}
