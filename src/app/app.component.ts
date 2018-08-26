import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { UserModel } from 'app/user/user.model';
import { AuthService } from 'app/core/auth.service';
import { MessageService } from 'app/core/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  user: UserModel = null;
  pageTitle = 'Product Management';

  constructor(
    private router: Router,
    private authService: AuthService,
    public messageService: MessageService
  ) {
  }

  ngOnInit() {


    // But we can get the URL
    // If routeGuard hinders navigation, the event will contain redirect route, and not the hindered route! If no redirect route, event will not fire.
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(event => {
        console.log(event);
      });

    this.userSubscription = this.authService.user$.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logOut() {
    this.authService.logout();
  }

  displayMessages() {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
  }

  hideMessages() {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }
}
