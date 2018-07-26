import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanLoad, Route } from '@angular/router'; // see product-resolver for comments on RouterStateSnapshot, ActivatedRouteSnapshot
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

    constructor(
        private router: Router,
        private authService: AuthService
    ) {

    }

    // route has information about the current, about to be activated route
    // state provides information about the whole router state
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // Can return an observable here, the routing will wait for it before proceding with navigation

                            // /products
        return this.checkLogin(state.url);
    }

    // since the module defining the route is not yet loaded, canLoad can not access ActivatedRouteSnapshot nor RouterStateSnapshot
    canLoad(route: Route): boolean {

                            // products     -- different from state.url (no slash in the beginning), but it seems to work anyway
        return this.checkLogin(route.path);
    }

    private checkLogin(url: string) {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.authService.redirectUrl = url;   // we set redirectUrl here, the property is used when navigating after login in auth.service
            this.router.navigate(['/login']);
            return false;
        }
    }

}
