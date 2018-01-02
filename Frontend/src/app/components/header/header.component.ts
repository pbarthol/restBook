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
  HideLoginAction, ClearMessageAction,
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
  private msgs: Message[] = [];
  messages = [];

  constructor(private appStore: Store<AppState>,
              private advGrowlService: AdvGrowlService) {
    this.userIsLoggedIn$ = this.appStore.select(state => state.user.userIsLoggedIn)
      .do(res => console.log("store.userinterface.userIsLoggedIn: ", res));
    this.messages$ = appStore.select(state => state.userinterface.messages);
  }

  ngOnInit() {
    // this.messages$.subscribe((messages: {}[]) => {
    //   this.msgs = [];
    //   messages.forEach(
    //     (message: {type: string, title: string, message: string, acknowledgeAction: string}) => {
    //     let msg = {severity: message.type, summary: message.title, detail: message.message}
    //     this.msgs.push(msg);
    //   })
    // });
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
    this.appStore.dispatch(new ShowRegisterAction());
  }

  showLogin() {
    this.appStore.dispatch(new HideRegisterAction());
    this.appStore.dispatch(new ShowLoginAction());
  }

  logout() {
    this.appStore.dispatch(new LogoutAction());
  }

  editUser() {
    this.appStore.dispatch(new ShowRegisterAction());
  }

  handleMessage(message: AdvPrimeMessage) {
    if (message.additionalProperties) {
      this.appStore.dispatch(new ClearMessageAction({itemIndex: message.additionalProperties.itemIndex}));
    }
  }

  onMessages(messages) {
    this.messages = messages;
  }

}
