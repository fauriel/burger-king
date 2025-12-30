import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg,
  IonMenu,
  IonContent,
  IonButtons,
  IonItem,
  IonLabel,
  IonBadge,
  MenuController,
  IonMenuButton, IonList, IonIcon, IonButton } from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { arrowBackOutline, cartOutline, peopleOutline } from 'ionicons/icons';
import { UserOrderrService } from 'src/app/service/user-order.service';
import { ListProductsComponent } from '../list-products/list-products.component';
import { LoginComponent } from '../login/login.component';
import { Preferences } from '@capacitor/preferences';
import { KEY_TOKEN } from 'src/app/constants';
import { ToastService } from 'src/app/service/toast.service';
import { CreateAccountComponent } from "../create-account/create-account.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [IonButton, IonIcon, IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonImg,
    RouterLink,
    IonMenu,
    IonContent,
    TranslatePipe,
    IonButtons,
    IonMenuButton,
    IonItem,
    IonLabel,
    IonBadge,
    ListProductsComponent,
    LoginComponent, CreateAccountComponent],
})
export class ToolbarComponent implements OnInit {
  private userOrderService: UserOrderrService = inject(UserOrderrService)
  public router: Router = inject(Router)
  private menuController: MenuController = inject(MenuController)

  private toastService: ToastService = inject(ToastService)
  private translateService: TranslateService = inject(TranslateService)
  public numProductsSignal = this.userOrderService.numProductsSignal
  public showorder: boolean = false;
  public userSignal  = this.userOrderService.userSignal
  showLogin: boolean = false
  newAccount: boolean = false

  constructor() {
    addIcons({
      peopleOutline,
      cartOutline,
      arrowBackOutline
    });
  }

  seeOrder(){
    this.showorder = true
  }
  seeLogin(){
    this.showLogin = true
    this.newAccount = false
  }
  back(){
    this.showorder = false
    this.showLogin = false
    this.newAccount = false
  }
  goToPay() {
    this.back();
    this.menuController.close('content');
    this.router.navigateByUrl('/pay');
  }
  logout(){
    this.userOrderService.setUser(null)
    Preferences.remove({
      key: KEY_TOKEN
    })
    this.router.navigateByUrl('categories')
    this.toastService.showToast(this.translateService.instant('label.logout.success'))
  }

  seeNewAccount(){
    this.showLogin = false
    this.newAccount = true

  }
  ngOnInit() {}
}
