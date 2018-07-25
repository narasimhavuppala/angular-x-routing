import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { ProductModel } from 'app/data/product.model';
import { productData } from 'app/data/product-data';

// Faking an async API
// this.products is mutaded in here, not optimal? -- We changed a bit of that, so edit is on a copy

export class ProductService {

    private products = productData;

    getProducts() {
        const products = JSON.parse(JSON.stringify(this.products));
        return Observable.of(products);
    }

    // view, edit, create
    // simulating a server delay with .delay()
    getProduct(id: number) {
        if (id === 0) {
            return Observable.of(this.initializeProduct()).delay(1000);
        }

        const product = JSON.parse(JSON.stringify(this.products.find(p => p.id === id)));
        return Observable.of(product).delay(1000);
    }

    createProduct(product: ProductModel): Observable<number> {
        return Observable.create((observer: Observer<number>) => {
            let maxId = 0;
            this.products.forEach((p) => {
                maxId = Math.max(p.id, maxId)
            });

            product.id = maxId + 1;

            this.products.push(product);
            observer.next(product.id);
        });
    }

    updateProduct(product: ProductModel): Observable<number> {
        return Observable.create((observer: Observer<number>) => {
            const productIndex = this.products.findIndex(p => p.id === product.id);
            this.products.splice(productIndex, 1, product);
            observer.next(product.id);
        });
    }

    deleteProduct(id: number): Observable<ProductModel> {
        return Observable.create((observer: Observer<boolean>) => {
            this.products = this.products.filter(p => p.id !== id);
            observer.next(true);
        });

    }

    private initializeProduct(): ProductModel {
        return {
            id: 0,
            productName: null,
            productCode: null,
            category: null,
            tags: [],
            releaseDate: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null
        };
    }
}
