import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
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
import { CategorieService } from 'src/app/service/categories.service';
import { ICategory } from 'src/app/models/category.models';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ImageUrlPipe } from 'src/app/pipe/image-url.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
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
    IonCard,
    IonImg,
    IonCardHeader,
    IonCardTitle,
    TranslatePipe,
    ImageUrlPipe
    
  ],
})
export class CategoriesPage {
   categoriesService: CategorieService = inject(CategorieService);
   categories: ICategory[] = [];
   loadingCtrl: LoadingController = inject(LoadingController);
   translateService: TranslateService = inject(TranslateService)

   private router: Router = inject(Router)

  constructor() {}

  async ionViewWillEnter() {
    this.loadData()
  }

  async loadData() {
    const loading = await this.loadingCtrl.create({
      message: this.translateService.instant('label.loading'),
      duration: 3000,
    });

    loading.present();
    this.categoriesService.getCategeroues().then((categories: ICategory[]) => {
      this.categories = categories;
    }).finally(() => {
      loading.dismiss();
    })
  }

  async refresherCategories(event: CustomEvent) {
    await this.loadData();
    (event.target as HTMLIonRefresherElement).complete();
  }

  goToProducts(category: ICategory){
    this.router.navigate(['products', category._id])
  }
  ngOnInit() {}
}