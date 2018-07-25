import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProductEditComponent } from 'app/product/product-edit/product-edit.component';

@Injectable()                               // The interface is like this, specify the component to use the guard on
export class ProductGuardService implements CanDeactivate<ProductEditComponent> {

    // We get the component as parameter
    canDeactivate(component: ProductEditComponent): boolean {
        if (component.isDirty()) {
            const productName = component.product.productName || 'New Product';
            return confirm(`Navigate away and lose all changes to ${productName}?`);
        }

        return true;
    }
} 
