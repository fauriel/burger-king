import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonList,
  IonCard,
  IonText,
  IonCardContent,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { IQuantityProducts } from 'src/app/models/quantity-products.model';
import { CalculateTotalPricePipe } from 'src/app/pipe/calculate-total-price.pipe';
import { ExtrasSelectedPipe } from 'src/app/pipe/extras-selected.pipe';
import { AlertService } from 'src/app/service/alert.service';
import { UserOrderrService } from 'src/app/service/user-order.service';
@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  imports: [
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    TranslatePipe,
    IonList,
    ExtrasSelectedPipe,
    IonCard,
    IonCardContent,
    IonText,
    CalculateTotalPricePipe,
  ],
})
export class ListProductsComponent implements OnInit {
  private userOrdenService: UserOrderrService = inject(UserOrderrService);
  public totalOrderSignal = this.userOrdenService.totalOrderSignal;
  public productsSignal = this.userOrdenService.productsSignals;
  private aleertService: AlertService = inject(AlertService);

  @Input() showButtonPay: boolean = true;
  @Output() pay: EventEmitter<void> = new EventEmitter<void>()

  oneMoreProduct(quantityProduct: IQuantityProducts) {
    this.userOrdenService.oneMoreProduct(quantityProduct.product);
  }
  oneLessProduct(quantityProduct: IQuantityProducts) {
    if (quantityProduct.quantity >= 1) {
      this.aleertService.alertConfirm(
        'Confirmación',
        '¿Quieres eliminar el producto?',
        () => this.userOrdenService.oneLessProduct(quantityProduct.product)
      );
    } else {
      this.userOrdenService.oneLessProduct(quantityProduct.product);
    }
  }
  clickPay() {
    this.pay.emit(
      
    )
  }

  ngOnInit() {}

  constructor() {
    addIcons({
      removeCircleOutline,
      addCircleOutline,
    });
  }
}
