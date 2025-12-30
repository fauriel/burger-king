import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { IonInput } from "@ionic/angular/standalone";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { KEY_TOKEN } from 'src/app/constants';
import { ITokenUser } from 'src/app/models/toke-users.model';
import { IUser } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth.service';
import { ToastService } from 'src/app/service/toast.service';
import { UserOrderrService } from 'src/app/service/user-order.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  imports: [IonInput,  ReactiveFormsModule,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    TranslatePipe,
    IonList,
    IonGrid,
    IonButton

   ]
})
export class CreateAccountComponent  implements OnInit {

  @Input() showButtonBack: boolean = false
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() doCreateAccount: EventEmitter<void> = new EventEmitter<void>();

  private formBuilder: FormBuilder = inject(FormBuilder)
  private userServices: UsersService = inject(UsersService)
  private toastService: ToastService = inject(ToastService)
  private translateService: TranslateService = inject(TranslateService)
  private userOrderService: UserOrderrService = inject(UserOrderrService)
  private authSertvice: AuthService = inject(AuthService)


  public formNewAccounbt: FormGroup =this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    address: ['', Validators.required]
  })

  exit(){
    this.back.emit()
  }

  createAccount(){
    const user: IUser = this.formNewAccounbt.value
    this.userServices.createUser(user).then(async (userDB: IUser) => {
      if(userDB){
        this.toastService.showToast(this.translateService.instant('label.create.account.success'))
     

        const token: ITokenUser = await this.authSertvice.login(user.email, user.password)

        Preferences.set({
          key: KEY_TOKEN,
          value: token.accessToken
        })
        this.userOrderService.setUser(userDB)
        this.doCreateAccount.emit()
      }else{
        this.toastService.showToast(this.translateService.instant('label.create.account.error'))
      }
    }).catch(err => {
      this.toastService.showToast(this.translateService.instant('label.create.account.error'))
      
    })
    
  }
  constructor() { }

  ngOnInit() {}

}
