import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { ProductModel } from 'app/data/product.model';
import { productData } from 'app/data/product-data';

// Faking an async API
// this.products is mutaded in here, not optimal?

export class ProductService {

    private products = productData;

    getProducts() {
        return Observable.of(this.products);
    }

    // view, edit, create
    // simulating a server delay with .delay()
    getProduct(id: number) {
        if (id === 0) {
            return Observable.of(this.initializeProduct()).delay(1000);
        }

        return Observable.of(this.products.find(p => p.id === id)).delay(1000);
    }

    createProduct(product: ProductModel): Observable<ProductModel> {
        return Observable.create((observer: Observer<ProductModel>) => {
            let maxId = 0;
            this.products.forEach((p) => {
                maxId = Math.max(p.id, maxId)
            });

            product.id = maxId + 1;

            this.products.push(product);
            observer.next(product);
        });
    }

    updateProduct(product: ProductModel): Observable<ProductModel> {
        return Observable.create((observer: Observer<ProductModel>) => {
            const productIndex = this.products.findIndex(p => p.id === product.id);
            this.products.splice(productIndex, 1, product);
            observer.next(product);
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
