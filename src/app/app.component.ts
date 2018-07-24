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
  user: UserModel = null;
  pageTitle = 'Acme Product Management';

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    // Can we get to the data property from this not routable component? No!
    // console.log(this.activatedRoute.snapshot.data['pageTitle']);

    // Can we subscribe to a resolve from this not routable component? No!
    // this.activatedRouteSubscription = this.activatedRoute.data.subscribe((data) => {
    //   console.log(data);
    // });

    // Can we get to route parameters from this not routable component? No!
    // "ActivatedRoute won't work on AppComponent"
    // https://stackoverflow.com/questions/40012369/how-to-get-the-active-route-in-app-component
    // https://github.com/angular/angular/issues/11023
    // this.routeParamSubscription = this.activatedRoute.paramMap.subscribe((p) => { 
    //   console.log(p);
    // });

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
    - As seen in product-list.component and product-detail.component (see also comments in templates) to retain settings for filter and showing images
  - Route:s data property
    - Can not change, use for static data
    - See product-routing.module and product-list.component for retrieving it
  - Route Resolver
    - See product-routing.module, product-detail.component, product-edit.component, product-edit-info.component and product-edit-tags.component
    - Remember that the resolved data is one instance, shared between routable components that fetches the data
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


  paramMap vs queryParamMap
  https://stackoverflow.com/questions/49615857/angular-parammap-vs-queryparammap


  # CHILD ROUTES
  -- Display routed component:s templates in other routed component:s templates
  - We use <router-outlet> in app.component.html and templates are loaded there
  - We can use a nested <router-outlet>, in other words a router-outlet in for example product-edit.component
    - We then use child routes, component templates that appears in the nested router-outlet
  - "Required for lazy loading"
  - See product-routing.module for info, and product-edit-info.component and product-edit-tags.component for getting resolve data in child route components


  # VALIDATING FORM CONTROLS IN CHILD ROUTE COMPONENTS
  - The child routes components are destroyed when user navigates between child routes, that means form validation state is also destroyed
  - When using template driven forms, it wont work to put <form> in parent component and a form controls in child component, Angular will ignore form controls in an <router-outlet>
  - We can use <form> in each child component and use manual validation that is not dependant of the form
  - I think with reactive forms / model driven forms, that we could have a form in each sub route... But Iam not sure at the moment
    - The teacher is using template driven forms, so lets just go along with the course for now


  # ROUTING EVENTS
  - use { enableTracing: true } as second argument for RouterModule.forRoot() to see them, see app-routing.module


  # SECONDARY ROUTES
  - See app.component for <router-outlet> with a name and messages-routing.module for route
  - Use a link like this to trigger a secondary route: [routerLink]="[{ outlets: { popup: ['messages'] } }]"
  - Can navigate to both a primary route and a secondary route, though teacher says it is buggy in her version of Angular
  [routerLink]="['/products', product.id, 'edit', { outlets: { popup: ['messages', foo.id] } } ]"

*/
