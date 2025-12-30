import { GetLanguageCodeResult, Device } from '@capacitor/device';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Network } from '@capacitor/network';
import { Router } from '@angular/router';
import config from 'capacitor.config';
import { UserOrderrService } from './service/user-order.service';


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
  private userORdenServie: UserOrderrService = inject(UserOrderrService)
  public loadSignal: WritableSignal<boolean> = signal(false)

  constructor() {}
  ngOnInit(): void {
    this.platform.ready().then(async () => {
      const language: GetLanguageCodeResult = await Device.getLanguageCode();
      if (language.value) {
        this.tranlateService.use(language.value);
      }
     
      this.checkNetwork()
      await this.userORdenServie.initOrder()
      config.plugins!.CapacitorHttp!.enabled = true

      this.loadSignal.set(true)
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
