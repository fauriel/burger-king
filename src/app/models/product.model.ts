import { ICategory } from "./category.models"
import { IProductoExtra } from "./product-extra.model"

export interface IProduct{
    _id?: string
    name: string
    img?: string
    price: number
    category: ICategory
    extras: IProductoExtra[]
}