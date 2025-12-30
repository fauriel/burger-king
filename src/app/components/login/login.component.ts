import { environment } from 'src/environments/environment';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { pawSharp } from 'ionicons/icons';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/service/auth.service';
import { ITokenUser } from 'src/app/models/toke-users.model';
import { ToastService } from 'src/app/service/toast.service';
import { Preferences } from '@capacitor/preferences';
import { KEY_TOKEN } from 'src/app/constants';
import { UsersService } from 'src/app/service/users.service';
import { UserOrderrService } from 'src/app/service/user-order.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonLabel,
    TranslatePipe,
    CommonModule,
    IonButton
    

  ]
})
export class LoginComponent  implements OnInit {

  private authService: AuthService = inject(AuthService)
  private toastService: ToastService = inject(ToastService)
  private translateService: TranslateService = inject(TranslateService)
  private formBuilder: FormBuilder = inject(FormBuilder);
  private userService: UsersService = inject(UsersService)
  private userOrderService: UserOrderrService = inject(UserOrderrService)

  @Output() doLogin: EventEmitter<void> = new EventEmitter<void>()
  @Input() showButtonBack: boolean = false
  @Output() back: EventEmitter<void> = new EventEmitter<void>()
  @Output() newAccount: EventEmitter<void> = new EventEmitter<void>()


  public formLogin: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required,]
  })
  login(){
    const user = this.formLogin.value
    this.authService.login(user.email, user.password).then(
      async (token: ITokenUser) => {
        if(token){
          this.toastService.showToast(this.translateService.instant('label.login.success'))
         await Preferences.set({
            key: KEY_TOKEN,
            value: token.accessToken
          })

          const userDB = await this.userService.getUser(user.email)
          this.userOrderService.setUser(userDB)
          this.doLogin.emit()
        }else{
          this.toastService.showToast(this.translateService.instant('label.login.error'))
        }
      }
    )

  }

  exit(){
    this.back.emit()
  }
  createNewAccount(){
    this.newAccount.emit()
  }

  constructor() { }

  ngOnInit() {}

}
