import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'app/data/product.model';

@Component({
  selector: 'app-product-edit-tags',
  templateUrl: './product-edit-tags.component.html'
})
export class ProductEditTagsComponent implements OnInit {

  errorMessage: string;
  newTags = '';
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
    });
  }

  addTags() {
    let tagArray = this.newTags.split(',');
    this.product.tags = this.product.tags ? this.product.tags.concat(tagArray) : tagArray;
    this.newTags = '';
  }

  removeTag(idx: number) {
    this.product.tags.splice(idx, 1);
  }

}
