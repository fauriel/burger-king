
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/category.models';

@Injectable({providedIn: 'root'})


export class CategorieService {
    private URL_BASE = `${environment.urlServer}/categories`;

    getCategeroues(){
        return CapacitorHttp.get({
            url: this.URL_BASE,
            params: {},
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response: HttpResponse) => {
            return response.data as ICategory[]
        })
    }

    constructor() { }
    
}
