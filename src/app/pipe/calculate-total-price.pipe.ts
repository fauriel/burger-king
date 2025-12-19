import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';
import { options } from 'ionicons/icons';

@Pipe({
  name: 'calculateTotalPrice',
  pure: false
})
export class CalculateTotalPricePipe implements PipeTransform {

  transform(product: IProduct, quantity: number): number {
   let priceProduct = product.price
   if(product.extras){
    let pricProductExtras = 0
    for (const extra of product.extras) {
      const selectedOption = extra.options.find(option => 
        option.seletected);
      priceProduct += selectedOption ? selectedOption.price : 0
    }
    priceProduct += pricProductExtras
   }

   const total = priceProduct * quantity
   return +total.toFixed(2)
  }

}
