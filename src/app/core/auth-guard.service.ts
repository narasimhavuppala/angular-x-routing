import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router'; // see product-resolver for comments on RouterStateSnapshot, ActivatedRouteSnapshot
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {

    }

    // route has information about the current, about to be activated route
    // state provides information about the whole router state
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // Can return an observable here, the routing will wait for it before proceding with navigation

        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}
