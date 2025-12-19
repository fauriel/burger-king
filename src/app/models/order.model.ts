import { IQuantityProducts } from "./quantity-products.model"
import { IUser } from "./user.model"

export interface IOrder {
    _id?: string
    address?: string
    user: IUser
    products: IQuantityProducts[]

}

export class Order{
    
}