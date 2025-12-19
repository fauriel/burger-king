import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonImg,
  IonMenu,
  IonContent,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [
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
  ],
})
export class ToolbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
