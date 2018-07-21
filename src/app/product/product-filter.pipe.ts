import { PipeTransform, Pipe } from '@angular/core';
import { ProductModel } from 'app/data/product.model';

@Pipe({
    name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

    transform(value: ProductModel[], filterBy: string): ProductModel[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        
        return filterBy ? value.filter((product: ProductModel) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
