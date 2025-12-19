import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  LoadingController,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { IProduct } from 'src/app/models/product.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ImageUrlPipe } from 'src/app/pipe/image-url.pipe';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonRefresher,
    IonRefresherContent,
    IonGrid,
    IonRow,
    IonCol,
    TranslatePipe,
    IonCard,
    IonImg,
    IonCardHeader,
    IonCardTitle,
    ImageUrlPipe,
  ],
})
export class ProductsPage implements OnInit {
  @Input() idCategory!: string;
  private router: Router = inject(Router);
  private productService: ProductsService = inject(ProductsService);
  loadingCtrl: LoadingController = inject(LoadingController);
  translateService: TranslateService = inject(TranslateService);

  public products: IProduct[] = [];

  async ionViewWillEnter() {
    if (this.idCategory) {
      this.loadData();
    } else {
      this.router.navigateByUrl('categories');
    }
  }

  async loadData() {
    const loading = await this.loadingCtrl.create({
      message: this.translateService.instant('label.loading'),
    });
    loading.present();

    this.productService
      .getproductsByCategory(this.idCategory)
      .then((products: IProduct[]) => {
        this.products = products;
      })
      .finally(() => {
        loading.dismiss();
      });
  }

  async refreshproduct(event: CustomEvent) {
    await this.loadData();
    (event.target as HTMLIonRefresherElement).complete();
  }
  goToProduct(product: IProduct){
    this.router.navigate(['product', product._id])
  }

  constructor() {}

  ngOnInit() {}
}
