import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { UserModel } from 'app/user/user.model';
import { AuthService } from 'app/core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  user:UserModel = null;
  pageTitle = 'Acme Product Management';

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() { 
    this.userSubscription = this.authService.user$.subscribe(user => this.user = user);
  }

  ngOnDestroy() { 
    this.userSubscription.unsubscribe();
  }

  logOut() {
    this.authService.logout();
  }
}

/* 

  When injecting authService public and use it in template like this: <li *ngIf="!authService.isLoggedIn()">
  The isLoggedIn() function is called whenever something "happens" like for instance user types something or navigates
  The function is called 4 times

  Lets instead try to use an event emitter

*/

/*

  # PROVIDING DATA WITH A ROUTE
  - Route parameters like :id
    - See product-routing.module, product-edit.component and product-detail.component
  - Optional route parameters, as seen below
  - Query parameters 
    - As seen in product-list.component and product-detail.component to retain settings for filter and showing images
  - Route:s data property
    - Can not change, use for static data
    - See product-routing.module and product-list.component for retrieving it
  - Route Resolver
  - Service that is injected in different components, holding some state


  # OPTONAL ROUTES PARAMETERS

  They must come last
  
  from template
  [routerLink]="['foo', bar.id, { key: value }]"

  from code
  this.router.navigate(['foo', bar.id, { key: value }]);

  const id = +this.activatedRoute.snapshot.params['id'];
  const key = this.activatedRoute.snapshot.params['key'];

  use paramMap instead: https://stackoverflow.com/questions/47809357/angular-4-5-route-parammap-vs-params , https://angular.io/api/router/ParamMap , https://angular.io/guide/router#activated-route-in-action

  We do NOT configure optional route parameters in route configuration
*/
