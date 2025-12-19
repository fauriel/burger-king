import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private URL_BASE = `${environment.urlServer}/products`;

  getproductsByCategory(idCategory: string) {
    return CapacitorHttp.get({
      url: `${this.URL_BASE}/category/${idCategory}`,
      params: {},
      headers: {
        'Content-type': 'application/json',
      },
    }).then((response: HttpResponse) => {
      // CapacitorHttp resolves even on non-2xx; ensure we only return iterables to the UI.
      if (response.status < 200 || response.status >= 300) {
        console.warn('[ProductsService] getproductsByCategory non-2xx response', {
          status: response.status,
          data: response.data,
        });
        return [];
      }

      const data: any = response.data;

      if (Array.isArray(data)) return data as IProduct[];
      if (Array.isArray(data?.products)) return data.products as IProduct[];
      if (Array.isArray(data?.data)) return data.data as IProduct[];

      console.warn('[ProductsService] getproductsByCategory unexpected payload shape', data);
      return [];
    });
  }

  getproduct(idProduct: string){
    return CapacitorHttp.get({
      url: `${this.URL_BASE}/${idProduct}`,
      params: {},
      headers: {
        'Content-type': 'application/json',
      },
    }).then((response: HttpResponse) => {
      return response.data as IProduct
    })
  }
}
