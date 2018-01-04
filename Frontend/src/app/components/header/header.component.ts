import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../reducers/index';
import {Message} from 'primeng/primeng';
import {AdvGrowlService} from 'primeng-advanced-growl';
import {AdvPrimeMessage} from 'primeng-advanced-growl/src/app/lib/adv-growl.model';

/** Store */
import { Store } from '@ngrx/store';
import { UIState } from '../../store/user-interface/reducer';
import {
  ShowRegisterAction,
  HideRegisterAction,
  ShowLoginAction,
  HideLoginAction,
  ClearMessageAction,
  ShowPasswordChangeAction,
  HidePasswordChangeAction
} from '../../store/user-interface/actions';
import { LogoutAction } from '../../store/user/actions';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {

  private userIsLoggedIn$: Observable<boolean>;
  private messages$: Observable<{}[]>;
  messages = [];
  private showRegister$: Observable<boolean>;
  private showLogin$: Observable<boolean>;
  private showPasswordChange$: Observable<boolean>;

  constructor(private appStore: Store<AppState>,
              private advGrowlService: AdvGrowlService) {
    this.userIsLoggedIn$ = this.appStore.select(state => state.user.userIsLoggedIn)
      .do(res => console.log("store.userinterface.userIsLoggedIn: ", res));
    this.messages$ = appStore.select(state => state.userinterface.messages);
    this.showRegister$ = this.appStore.select(state => state.userinterface.showRegister);
    this.showLogin$ = this.appStore.select(state => state.userinterface.showLogin);
    this.showPasswordChange$ = this.appStore.select(state => state.userinterface.showPasswordChange);
  }

  ngOnInit() {
    this.messages$.subscribe((messages: {}[]) => {
      this.advGrowlService.clearMessages();
      let index = 0;
      messages.forEach(
        (message: {type: string, title: string, message: string, acknowledgeAction: string}) => {
          let additionalProperty = {
            itemIndex: index,
            acknowledgeAction: message.acknowledgeAction
          }
          if (message.type === 'success') {
            this.advGrowlService.createSuccessMessage(
              message.message,
              message.title,
              additionalProperty
            );
          }
          if (message.type === 'error') {
            this.advGrowlService.createErrorMessage(
              message.message,
              message.title,
              additionalProperty
            );
          }
          index++;
        })
    });
  }

  showRegister() {
    this.appStore.dispatch(new HideLoginAction());
    this.appStore.dispatch(new HidePasswordChangeAction());
    this.appStore.dispatch(new ShowRegisterAction());
  }

  showLoginForm() {
    this.appStore.dispatch(new HideRegisterAction());
    this.appStore.dispatch(new HidePasswordChangeAction());
    this.appStore.dispatch(new ShowLoginAction());
  }

  logout() {
    this.appStore.dispatch(new LogoutAction());
    this.appStore.dispatch(new HidePasswordChangeAction());
  }

  editUser() {
    this.appStore.dispatch(new HidePasswordChangeAction());
    this.appStore.dispatch(new HideLoginAction());
    this.appStore.dispatch(new ShowRegisterAction());
  }

  handleMessage(message: AdvPrimeMessage) {
    if (message.additionalProperties) {
      this.appStore.dispatch(new ClearMessageAction({itemIndex: message.additionalProperties.itemIndex}));
    }
  }

  changePassword() {
    this.appStore.dispatch(new ShowPasswordChangeAction());
  }

}
