import { Injectable, Signal, signal } from '@angular/core';
import { IOrder, Order } from '../models/order.model';
import { IQuantityProducts } from '../models/quantity-products.model';
import { IUser } from '../models/user.model';
import { Preferences } from '@capacitor/preferences';
import { JsonPipe } from '@angular/common';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class UserOrderrService {

  private order!: Order;
  private readonly KEY_ORDER = 'ddr_'
  public productsSignals!: Signal<IQuantityProducts[]> 
  public userSignal!: Signal<IUser | null>;
  public addressSignal!: Signal<string>;
  public numProductsSignal!: Signal<number>;
  public totalOrderSignal!: Signal<number>;

 
  async initOrder(){
    const orderPreferences = await Preferences.get({
      key: this.KEY_ORDER
    })
    if(orderPreferences.value){
      const order: IOrder = JSON.parse(orderPreferences.value)
    
    this.order = new Order(
    order.products,
    order.user,
    order.address
    )
  }else{
    this.order = new Order();
 
  }
  this.productsSignals = this.order.productsSignal
  this.userSignal = this.order.userSignal;
  this.addressSignal = this.order.addressSignal;
  this.numProductsSignal = this.order.numProductsOrder
  this.totalOrderSignal = this.order.totalOrderSignal

  if(!orderPreferences.value){
    this.saveorder();
  }

  }
  async saveorder(){
    const order: IOrder = this.getOrder();
     await Preferences.set({
      key: this.KEY_ORDER,
      value: JSON.stringify(order)
    })

  }
  private getOrder(){
    return{
    products: this.productsSignals(),
    user: this.userSignal(),
    address: this.addressSignal(),
    } as IOrder
  }

  public addproduct(product: IProduct, quantity: number = 1){
    this.order.addProduct(product, quantity)
    this.saveorder()

  }
  public oneMoreProduct(product: IProduct){
    this.order.oneMoreProducts(product)
    this.saveorder()
  }
  public oneLessProduct(product: IProduct){
    this.order.oneLessProducts(product)
    this.saveorder()
  }
  public resetOrder(){
    this.order.resetOrder()
    this.saveorder()
  }
  public setUser(user: IUser | null){
    this.order.setUser(user)
    this.saveorder()
  }
  public setAddress(address: string){
    this.order.setAddress(address)
    this.saveorder()
  }
}
