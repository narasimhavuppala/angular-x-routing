import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page-404/page-404.component';

export const routes: Routes = [
    {
        path: 'welcome',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: 'welcome',                  // We can only do one redirecti, meaning it would not work to redirect again from 'welcome' to another path
        pathMatch: 'full'                       // the path must be completly empty, can also use 'prefix', https://angular.io/guide/router#redirecting-routes
    },
    {
        path: '**',
        component: Page404Component             // The order of these routes are important, as for example this wildcard matches everything
    }
];
