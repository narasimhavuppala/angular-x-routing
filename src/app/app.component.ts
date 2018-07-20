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
