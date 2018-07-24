import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  routChangeSubscription: Subscription;
  loading = true;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.routChangeSubscription = this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    this.routChangeSubscription.unsubscribe();
  }

}
