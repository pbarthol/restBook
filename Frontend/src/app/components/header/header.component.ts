import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../reducers/index';
import {Message} from 'primeng/primeng';
import {AdvGrowlService} from 'primeng-advanced-growl';
import {AdvPrimeMessage} from 'primeng-advanced-growl/src/app/lib/adv-growl.model';

/** Store */
import { Store } from '@ngrx/store';
import {
  ShowRegisterAction,
  HideRegisterAction,
  ShowLoginAction,
  HideLoginAction,
  ClearMessageAction,
  ShowPasswordChangeAction,
  HidePasswordChangeAction,
  SetMessageAction,
  ShowRestaurantOverviewAction,
  HideRestaurantOverviewAction,
  ShowMealOverviewAction,
  HideMealOverviewAction,
  ShowMealEditAction,
  HideMealEditAction
} from '../../store/user-interface/actions';
import { LogoutAction } from '../../store/user/actions';
import { User } from '../../store/user/models';


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
  private showRestaurantEdit$: Observable<boolean>;
  private showRestaurantDetail$: Observable<boolean>;
  private showMealOverview$: Observable<boolean>;
  private showMealEdit$: Observable<boolean>;
  private detailRestaurantId$: Observable<string>;
  private detailRestaurantId: string;

  constructor(private appStore: Store<AppState>,
              private advGrowlService: AdvGrowlService) {
    this.userIsLoggedIn$ = this.appStore.select(state => state.user.userIsLoggedIn)
    this.messages$ = appStore.select(state => state.userinterface.messages);
    this.showRegister$ = this.appStore.select(state => state.userinterface.showRegister);
    this.showLogin$ = this.appStore.select(state => state.userinterface.showLogin);
    this.showPasswordChange$ = this.appStore.select(state => state.userinterface.showPasswordChange);
    this.loggedInUser$ = this.appStore.select(state => state.user.user)
    this.showRestaurantOverview$ = this.appStore.select(state => state.userinterface.showRestaurantOverview);
    this.showRestaurantEdit$ = this.appStore.select(state => state.userinterface.showRestaurantEdit);
    this.showMealOverview$ = this.appStore.select(state => state.userinterface.showMealOverview);
    this.showMealEdit$ = this.appStore.select(state => state.userinterface.showMealEdit);
    this.detailRestaurantId$ = this.appStore.select(state => state.restaurants.detailRestaurantId);
  }

  ngOnInit() {
    this.hideAllForms();
    this.detailRestaurantId$.subscribe((restaurantId: string) => {
      this.detailRestaurantId = restaurantId;
    })
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
            if (oneMessage.type === 'info') {
              this.advGrowlService.createInfoMessage(
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
    this.hideAllForms();
    this.appStore.dispatch(new ShowRegisterAction());
  }

  showLoginForm() {
    this.hideAllForms();
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
    this.hideAllForms();
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
    this.hideAllForms();
    this.appStore.dispatch(new ShowPasswordChangeAction());
  }

  showRestaurantOverview(){
    this.hideAllForms();
    this.appStore.dispatch(new ShowRestaurantOverviewAction())
  }

  hideAllForms() {
    this.appStore.dispatch(new HideRegisterAction());
    this.appStore.dispatch(new HideLoginAction());
    this.appStore.dispatch(new HidePasswordChangeAction());
    this.appStore.dispatch(new HideRestaurantOverviewAction());
    this.appStore.dispatch(new HideMealOverviewAction());
    this.appStore.dispatch(new HideMealEditAction());
  }
}
