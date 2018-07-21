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
  ) { }

  ngOnInit() {
    this.routeParamSubscription = this.activatedRoute.params.subscribe((params) => {
      const id = +params['id'];
      this.pageTitle = id === 0 ? 'Create Product' : this.pageTitle;
      this.productSubscription = this.productService.getProduct(id).subscribe(p => this.product = p);
    });
  }

  ngOnDestroy() {
    this.routeParamSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }
}
