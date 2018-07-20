import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnChanges {
  @Input() rating: number;
  @Output() ratingClicked = new EventEmitter<string>();
  starWidth: number;

  ngOnChanges() {
    // Convert x out of 5 starts to y out of 86px width
    this.starWidth = this.rating * 86 / 5;
  }

  onClick() {
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
  }

}
