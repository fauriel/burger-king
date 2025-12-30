import { IProduct } from "../models/product.model";

export function calculateTotal(product: IProduct, quantity: number): number{

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
     
