import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText

} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-not-network',
  templateUrl: './not-network.page.html',
  styleUrls: ['./not-network.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    FormsModule,
    IonText,
    TranslatePipe


  ],
})
export class NotNetworkPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
