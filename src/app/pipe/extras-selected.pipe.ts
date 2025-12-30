import { inject, Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProductoExtra } from '../models/product-extra.model';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'extrasPipe',
})
export class ExtrasSelectedPipe implements PipeTransform {
    private translateService: TranslateService = inject(TranslateService)


  transform(extras: IProductoExtra[]): string[] {
    const optionsSelected: string[] = [];
    for (const extra of extras) {
      const optionSelected = extra.options.find(option => option.seletected);
      
      if (optionSelected) {
        if(extra.options.length == 1){
            optionsSelected.push(this.translateService.instant(extra.name))
           // optionSelected.push(extra.name)
        }else{
            optionsSelected.push(this.translateService.instant(extra.name) + ':'
        + this.translateService.instant(optionSelected.name!))
        }
      }
    }
    return optionsSelected;
  }
}
