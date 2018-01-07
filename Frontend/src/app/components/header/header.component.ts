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
  HidePasswordChangeAction,
  SetMessageAction,
  ShowRestaurantOverviewAction
} from '../../store/user-interface/actions';
import { LogoutAction } from '../../store/user/actions';
import { User } from '../../store/user/models';
import {Restaurant} from "../../store/restaurants/restaurant/models";


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {

  messages = [];
  private userIsLoggedIn$: Observable<boolean>;
  private messages$: Observable<{}[]>;
  private showRegister$: Observable<boolean>;
  private showLogin$: Observable<boolean>;
  private showPasswordChange$: Observable<boolean>;
  private loggedInUser$: Observable<User>;
  private loggedInUser: User;
  private showRestaurantOverview$: Observable<boolean>;
  private showRestaurantDetails$: Observable<boolean>;

  constructor(private appStore: Store<AppState>,
              private advGrowlService: AdvGrowlService) {
    this.userIsLoggedIn$ = this.appStore.select(state => state.user.userIsLoggedIn)
    this.messages$ = appStore.select(state => state.userinterface.messages);
    this.showRegister$ = this.appStore.select(state => state.userinterface.showRegister);
    this.showLogin$ = this.appStore.select(state => state.userinterface.showLogin);
    this.showPasswordChange$ = this.appStore.select(state => state.userinterface.showPasswordChange);
    this.loggedInUser$ = this.appStore.select(state => state.user.user)
    this.showRestaurantOverview$ = this.appStore.select(state => state.userinterface.showRestaurantOverview);
    this.showRestaurantDetails$ = this.appStore.select(state => state.userinterface.showRestaurantDetails);
  }

  ngOnInit() {
    this.messages$.subscribe((storeMessages: {}[]) => {
      let index: number;
      let additionalProperty: {};
      this.advGrowlService.clearMessages();
      storeMessages.forEach(
        (oneMessage: {type: string, title: string, message: string, acknowledgeAction: string}) => {
          const msgIndex = this.messages.findIndex((message: AdvPrimeMessage) =>
            message.severity === oneMessage.type
            && message.summary === oneMessage.title
            && message.detail === oneMessage.message
          );
          if (msgIndex < 0) {
            additionalProperty = {
              acknowledgeAction: oneMessage.acknowledgeAction
            };
            if (oneMessage.type === 'success') {
              this.advGrowlService.createSuccessMessage(
                oneMessage.message,
                oneMessage.title,
                additionalProperty
              );
            }
            if (oneMessage.type === 'error') {
              this.advGrowlService.createErrorMessage(
                oneMessage.message,
                oneMessage.title,
                additionalProperty
              );
            }
          }
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
    this.appStore.dispatch(new SetMessageAction({
      message: {
        type: 'success',
        title: 'Logout',
        message: 'You are logged out!',
        acknowledgeAction: ''
      }
    }));

  }

  editUser() {
    this.appStore.dispatch(new HidePasswordChangeAction());
    this.appStore.dispatch(new HideLoginAction());
    this.appStore.dispatch(new ShowRegisterAction());
  }

  handleMessage(message: AdvPrimeMessage) {
    if (message.additionalProperties) {
      // this.appStore.dispatch(new ClearMessageAction({itemIndex: message.additionalProperties.itemIndex}));
      this.appStore.dispatch(new ClearMessageAction(
        {
          severity: message.severity,
          summary: message.summary,
          detail: message.detail
        }));
    }
  }

  public onMessages(messages) {
    this.messages = messages;
  }

  changePassword() {
    this.appStore.dispatch(new ShowPasswordChangeAction());
  }

  showRestaurantOverview(){
    this.appStore.dispatch(new ShowRestaurantOverviewAction())
  }

}
