import { Component } from '@angular/core';

@Component({
  // dont need a selector since it is only routed to
  templateUrl: './home.component.html'
})
export class HomeComponent {
  pageTitle = 'Welcome';
}
