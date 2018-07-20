import { ProductModel } from 'app/data/product.model';
import { productData } from 'app/data/product-data';

export class ProductService {

    private products = productData;

    getProducts() {
        return this.products;
    }

    getProduct(id?: number) {
        if (id == null) {
            return this.initializeProduct();
        }

        return this.products.find(p => p.id === id);
    }

    createProduct(product: ProductModel) {
        this.products.push(product);
    }

    updateProduct(product: ProductModel) {
        const productIndex = this.products.findIndex(p => p.id === product.id);
        this.products.splice(productIndex, 1, product);
    }

    deleteProduct(id: number) {
        this.products = this.products.filter(p => p.id !== id);
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
