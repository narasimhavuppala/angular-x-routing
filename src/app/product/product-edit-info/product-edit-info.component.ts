import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'app/data/product.model';

@Component({
  selector: 'app-product-edit-info',
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {

  @ViewChild('productForm') productForm: NgForm;

  errorMessage: string;
  product: ProductModel;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get the data from parents resolver
    // this.product = this.activatedRoute.parent.snapshot.data['product'];

    // Get the data from parents resolver via subscription
    this.activatedRoute.parent.data.subscribe((data) => { 
      this.product = data['product'];
      
      if(this.productForm) {
        // Reset form and validation when new data arrives, for example user is creating (clicks on Add Product in top menu link) instead of editing
        // We do not need this logic in product-edit-tags.component since this route is the default...
        this.productForm.reset();
      }
    });
  }

}
