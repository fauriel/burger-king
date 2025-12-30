import { computed, Signal, signal, WritableSignal } from '@angular/core';
import { IQuantityProducts } from './quantity-products.model';
import { IUser } from './user.model';
import { IProduct } from './product.model';
import { calculateTotal } from '../utils/calculate-total.util';

export interface IOrder {
  _id?: string;
  address?: string;
  user: IUser;
  products: IQuantityProducts[];
}

export class Order {
  private _numProductsSignal: Signal<number>;
  public get numProductsOrder(): Signal<number> {
    return this._numProductsSignal;
  }
 
  private _totalOrderSignal: Signal<number>;
  public get totalOrderSignal(): Signal<number> {
    return this._totalOrderSignal;
  }
 
  private _productsSignal: WritableSignal<IQuantityProducts[]>;
  public get productsSignal(): Signal<IQuantityProducts[]> {
    return this._productsSignal.asReadonly();
  }

  private _userSignal: WritableSignal<IUser | null>;
    public get userSignal(): Signal<IUser | null> {
        return this._userSignal.asReadonly()
    }
   
  private _addressSignal: WritableSignal<string>;
    public get addressSignal(): Signal<string> {
        return this._addressSignal.asReadonly()
    }

    private serarchProduct(product: IProduct): IQuantityProducts | undefined{
      return this._productsSignal().find((quantity: IQuantityProducts) => JSON.stringify(product) === JSON.stringify(quantity.product))
    }
  
    public addProduct(product: IProduct, quantity: number = 1){
     const productfopund = this.serarchProduct(product)
     const products = this._productsSignal()
     if(productfopund){
      productfopund.quantity += quantity
     }else {
      products.push({
        product,
        quantity
      })
     }
     this._productsSignal.set([...products])
    }

    private numproducts(){
     return this._productsSignal().reduce((sum: number, value: IQuantityProducts) => sum + value.quantity,  0)
    }
    private totalOrder(){
      return this._productsSignal().reduce((sum: number, value: IQuantityProducts) => sum + calculateTotal(value.product, value.quantity), 0)
    }

    private removeproduct(product: IProduct){
      return this._productsSignal.update(product => product.filter((quantity: IQuantityProducts) =>
       JSON.stringify(product) !== JSON.stringify(quantity.product) ))
    }

    public oneMoreProducts(product: IProduct){
      const productfopund = this.serarchProduct(product)
      if(productfopund){
        productfopund .quantity++;
        this._productsSignal.set([...this._productsSignal()])
      }
    }
    public oneLessProducts(product: IProduct){
      const productfopund = this.serarchProduct(product)
      if(productfopund){
        productfopund .quantity--;
        if(productfopund.quantity == 0){
          this.removeproduct(productfopund.product)
        }else{
        this._productsSignal.set([...this._productsSignal()])
      }
    }
    }

    public resetOrder(){
      this._productsSignal.set([])
      this._addressSignal.set('')
    }
    
    public setUser(user: IUser | null){
      this._userSignal.set(user)

    }
    
    public setAddress(address: string){
      this._addressSignal.set(address)

    }
    
  constructor(
    products: IQuantityProducts[] = [],
    user: IUser | null = null,
    address: string = ''
  ) {
    this._productsSignal = signal(products);
    this._userSignal = signal(user);
    this._addressSignal = signal(address);
    this._numProductsSignal = computed(() => this.numproducts())
    this._totalOrderSignal = computed(() => this.totalOrder())
  }
}
