import { GetLanguageCodeResult, Device } from '@capacitor/device';
import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Network } from '@capacitor/network';
import { Router } from '@angular/router';
import config from 'capacitor.config';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonRouterOutlet,
    TranslatePipe,
    ToolbarComponent,
    FooterComponent,
  ],
})
export class AppComponent implements OnInit {

  private router: Router = inject(Router)
  private platform = inject(Platform);
  private tranlateService = inject(TranslateService);
  constructor() {}
  ngOnInit(): void {
    this.platform.ready().then(async () => {
      const language: GetLanguageCodeResult = await Device.getLanguageCode();
      if (language.value) {
        this.tranlateService.use(language.value);
      }
      this.checkNetwork()
      config.plugins!.CapacitorHttp!.enabled = true
    });
  }

  checkNetwork(){
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      if(!status.connected){
        this.router.navigateByUrl('/not-network')
      }else{
        this.router.navigateByUrl('/categories')
      }
    });
  }
}
