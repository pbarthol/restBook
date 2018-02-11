import { Component, OnInit, Input } from '@angular/core';

/** Store, State */
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/index';
import { User } from '../../store/user/models';
import { Observable } from "rxjs";
import { HidePasswordChangeAction } from "../../store/user-interface/actions";
import {
  ChangePasswordAction
} from "../../store/user/actions";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  private user: User;
  private user$: Observable<User>;
  private passwordRepeat: string;
  passwordRequired: boolean;
  passwordRepeatRequired: boolean;
  passwordsNotIdentical: boolean;
  userLoaded: boolean;

  constructor(private appStore: Store<AppState>) {
    this.user$ = this.appStore.select(state => state.user.user);
    this.userLoaded = false;
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      this.user = user;
      this.user.password = '';
      this.userLoaded = true;
    })
  }

  checkPasswords() {
    let passwordsOk: boolean = true;
    this.passwordRequired = false;
    this.passwordRepeatRequired = false;
    if (this.user.password === null ||
        this.user.password === undefined ||
        this.user.password === '') {
      this.passwordRequired = true;
      passwordsOk = false;
    }
    if (this.passwordRepeat === null ||
      this.passwordRepeat === undefined ||
      this.passwordRepeat === '') {
      this.passwordRepeatRequired = true;
      passwordsOk = false;
    }
    if (passwordsOk) {
      if (this.user.password !== this.passwordRepeat) {
        this.passwordsNotIdentical = true;
        passwordsOk = false
      } else {
        this.passwordsNotIdentical = false;
      }
    }
    if (passwordsOk) {
      return true;
    } else {
      return false;
    }
  }
  savePassword() {
    if (this.checkPasswords()) {
      this.appStore.dispatch(new ChangePasswordAction({user: this.user}));
    }
  }

  hidePasswordChange() {
    this.appStore.dispatch(new HidePasswordChangeAction());
  }

}
