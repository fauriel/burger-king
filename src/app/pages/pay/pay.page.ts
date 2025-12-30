import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonButton
} from '@ionic/angular/standalone';
import { UserOrderrService } from 'src/app/service/user-order.service';
import { LoginComponent } from "src/app/components/login/login.component";
import { Router } from '@angular/router';
import { CreateAccountComponent } from "src/app/components/create-account/create-account.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonGrid,
    IonRow,
    IonCol,
    LoginComponent,
    CreateAccountComponent,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    TranslatePipe,
    IonCardContent,
    IonButton
],
})
export class PayPage implements OnInit {

  private userOrderService: UserOrderrService = inject(UserOrderrService)

  public userSignal = this.userOrderService.userSignal
  private router: Router = inject(Router)
  public showCreateAccount: boolean =false
  public step: number = 1;

  backHome(){
    this.router.navigateByUrl('categories')

  }
  newAccoutn(){
    this.showCreateAccount = true
  }
  seeLogin(){
    this.showCreateAccount = false
  }
  nextStep(){
    this.step += 1
  }
  previustStep(){
    this.step -= 1
  } 
  
  constructor() {}

  ngOnInit() {}
}
