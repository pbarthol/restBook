import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginAction } from '../../store/user/actions';

/** Store, State */
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import {HideLoginAction} from "../../store/user-interface/actions";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  private username: string;
  private password: string;
  private userIsLoggedIn$: Observable<boolean>;

  constructor(private appStore: Store<AppState>) {
    this.userIsLoggedIn$ = this.appStore.select(state => state.user.userIsLoggedIn);
  }

  ngOnInit() {
  }

  login() {
    this.appStore.dispatch(new LoginAction({username: this.username, password: this.password}));
    this.userIsLoggedIn$.subscribe(loggedIn => {
      if (!loggedIn) {
        this.hideLogin();
      }
    })
  }

  hideLogin() {
    this.appStore.dispatch(new HideLoginAction());
  }
}
