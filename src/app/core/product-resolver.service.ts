import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ProductModel } from 'app/data/product.model';
import { ProductService } from './product.service';

@Injectable()                       // This makes it behave like a resolver
export class ProductResolverService implements Resolve<ProductModel> {

    constructor(
        private router: Router,
        private productService: ProductService
    ) {

    }

    resolve(
        // Contains information about the current activated route, it is the same as snapshot in 'this.activatedRoute.snapshot'
        route: ActivatedRouteSnapshot,
        // Represent the state of the applications router at a moment in time, it is a tree of ActivatedRouteSnapshots
        state: RouterStateSnapshot
        // The resolve function can return an Observable, a promise or just data
    ): Observable<ProductModel> {

        // Benefits of using a resolver
        // - all data is loaded, so user wont see partial info (is that really a benefit?)
        // - we can do error handling here and redirect if something goes wrong

        const id = route.paramMap.get('id');

        if (isNaN(+id)) {
            return this.handleError(`Product id ${id} was not a number`);
        }

        return this.productService.getProduct(+id)
            .map((product) => {
                // The map operator returns this as an observable

                if (product) {
                    return product;
                }

                return this.handleError(`Product with id ${id} was not found`);
            })
            .catch((error) => { 
                return this.handleError(error);
            });
    }

    private handleError(error: string) {
        console.log(error);
        this.router.navigate(['/products']);
        return Observable.of(null);
    }

}
