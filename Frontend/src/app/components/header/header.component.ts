import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../reducers/index';

/** Store */
import { Store } from '@ngrx/store';
import { UIState } from '../../store/user-interface/reducer';
import { ShowRegisterAction,
  HideRegisterAction,
  ShowLoginAction,
  HideLoginAction,
  LogoutAction} from '../../store/user-interface/actions';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HeaderComponent implements OnInit {

  private userIsLoggedIn$: Observable<boolean>;

  constructor(private appStore: Store<AppState>) {
    this.userIsLoggedIn$ = this.appStore.select(state => state.userinterface.userIsLoggedIn)
      .do(res => console.log("store.userinterface.userIsLoggedIn: ", res));;
  }

  ngOnInit() {
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
}
