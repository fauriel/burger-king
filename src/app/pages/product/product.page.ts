import {
  Component,
  inject,
  Input,
  input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  LoadingController,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonItem,
  IonButton,
  IonCardContent,
  IonRadioGroup,
  IonRadio,
  IonFab,
  IonLabel,
  IonText,
  IonIcon,
  IonCheckbox,
  IonFabButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { IProduct } from 'src/app/models/product.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ImageUrlPipe } from 'src/app/pipe/image-url.pipe';
import { addIcons } from 'ionicons';
import { addOutline, removeOutline } from 'ionicons/icons';
import { IProductoExtraOptions } from 'src/app/models/product-extra-options.model';
import { RadioGroupCustomEvent } from '@ionic/core';
import { CalculateTotalPricePipe } from 'src/app/pipe/calculate-total-price.pipe';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonCheckbox,
    IonIcon,
    IonText,
    IonCard,
    IonContent,
    CommonModule,
    FormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonImg,
    IonCardHeader,
    IonCardTitle,
    TranslatePipe,
    ImageUrlPipe,
    IonCardSubtitle,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonText,
    IonCardContent,
    IonCheckbox,
    FormsModule,
    IonRadioGroup,
    IonRadio,
    CalculateTotalPricePipe,
    IonFabButton,
    IonFab,
  ],
})
export class ProductPage {
  @Input() idProduct!: string;
  private router: Router = inject(Router);
  private productService: ProductsService = inject(ProductsService);
  public productSignal: WritableSignal<IProduct | null> = signal(null);
  loadingCtrl: LoadingController = inject(LoadingController);
  translateService: TranslateService = inject(TranslateService);
  public auitnitySignal: WritableSignal<number> = signal(1);
  private toastservice: ToastService = inject(ToastService);

  ionViewWillEnter() {
    if (this.idProduct) {
      this.loadProduct();
    } else {
      this.router.navigateByUrl('categories');
    }
  }

  async loadProduct() {
    const loading = await this.loadingCtrl.create({
      message: this.translateService.instant('label.loading'),
    });
    loading.present();

    this.productService
      .getproduct(this.idProduct)
      .then((product: IProduct) => {
        this.productSignal.set(product);
      })
      .finally(() => {
        loading.dismiss();
      });
  }

  removeQuantity() {
    this.auitnitySignal.update((value) => value - 1);
  }
  addQuantity() {
    this.auitnitySignal.update((value) => value + 1);
  }
  changeMultipleOptions(
    event: RadioGroupCustomEvent,
    options: IProductoExtraOptions[]
  ) {
    options.forEach((op) => (op.seletected = event.detail.value == op.name));
  }

  addProductOrder(product: IProduct) {
    this.toastservice.showToast(
      this.translateService.instant('label.product.add.success')
    );
    this.router.navigateByUrl('categories');
  }

  constructor() {
    addIcons({
      addOutline,
      removeOutline,
    });
  }
}
