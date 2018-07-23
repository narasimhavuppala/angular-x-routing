import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-edit-tags',
  templateUrl: './product-edit-tags.component.html'
})
export class ProductEditTagsComponent implements OnInit {

  errorMessage: string;
  newTags = '';
  product = { id: 1, category: 'test', tags: ['test'] };

  constructor() { }

  ngOnInit() {
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
