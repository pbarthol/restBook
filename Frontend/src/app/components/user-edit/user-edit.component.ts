import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';
import { User } from '../../store/user/models';
/** Store */
import { Store } from '@ngrx/store';
import {HideRegisterAction, LoginAction, LogoutAction} from '../../store/user-interface/actions';
import { UserState } from '../../store/user/reducer';
import { CreateUserAction } from '../../store/user/actions';
import { AppState } from '../../reducers/index';

import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-user-edit',
  templateUrl: 'user-edit.component.html',
  styleUrls: ['user-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class UserEditComponent implements OnInit {

  private msgs: Message[] = [];
  private selectedSalutation: string;
  private salutations: SelectItem[];
  private user: User;
  private passwordRepeat: String;
  /** Input checks */
  private firstNameRequired: boolean;
  private lastNameRequired: boolean;
  private streetRequired: boolean;
  private passwordRequired: boolean;
  private passwordRepeatRequired: boolean;
  private formTitle: String;
  private labelSaveButton: String;

  private userIsLoggedIn$: Observable<boolean>;
  private user$: Observable<User>;
  private editUser: boolean;

  constructor(private appStore: Store<AppState>) {
    this.firstNameRequired = false;
    this.lastNameRequired = false;
    this.streetRequired = false;
    this.passwordRequired = false;
    this.passwordRepeatRequired = false;
    this.userIsLoggedIn$ = this.appStore.select(state => state.userinterface.userIsLoggedIn);
    this.user$ = this.appStore.select(state => state.user.user);
  }

  ngOnInit() {
    this.salutations = [];
    this.salutations.push({label: 'Select Salutation', value: 0});
    this.salutations.push({label: 'Herr', value: 'Herr'});
    this.salutations.push({label: 'Frau', value: 'Frau'});
    this.userIsLoggedIn$.subscribe(loggedIn => {
      if (loggedIn){
        this.user$.subscribe(user => this.user = user);
        this.editUser = true;
        this.formTitle = 'Update Profile';
        this.labelSaveButton = 'Update Profile';
      } else {
        this.user = new User();
        this.editUser = false;
        this.formTitle = 'Register';
        this.labelSaveButton = 'Register';
      }
    })
  }

  hideRegister() {
    this.appStore.dispatch(new HideRegisterAction()); // set registerIsVisible false
  }

  checkInputs() {
    // check passwords
    let failure: boolean = false;
    if (this.user.firstName === null ||
      this.user.firstName === undefined ||
      this.user.firstName === '') {
      this.firstNameRequired = true;
      failure = true;
    } else {
      this.firstNameRequired = false;
    }

    if (this.user.lastName === null ||
      this.user.lastName === undefined ||
      this.user.lastName === '') {
      this.lastNameRequired = true;
      failure = true;
    } else {
      this.lastNameRequired = false;
    }

    if (this.user.street === null ||
      this.user.street === undefined ||
      this.user.street === '') {
      this.streetRequired = true;
      failure = true;
    } else {
      this.streetRequired = false;
    }

    if (this.user.password === null ||
      this.user.password === undefined ||
      this.user.password === '') {
      this.passwordRequired = true;
      failure = true;
    } else {
      this.passwordRequired = false;
    }

    if (this.passwordRepeat === null ||
      this.passwordRepeat === undefined ||
      this.passwordRepeat === '') {
      this.passwordRepeatRequired = true;
      failure = true;
    } else {
      this.passwordRepeatRequired = false;
    }

    if (this.passwordRepeat != this.user.password) {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Registering', detail: 'Passwords are not identical.'});
      return false;
    }

    if (failure) {
      return false;
    } else {
      return true;
    }
  }

  saveUser() {
    this.userIsLoggedIn$.subscribe(loggedIn => {
      if (!loggedIn) {
        if (this.checkInputs()) {
          this.user._id = '0';
          this.appStore.dispatch(new CreateUserAction({user: this.user}));
          // show success save message
          this.msgs = [];
          this.msgs.push({severity: 'success', summary: 'Registering', detail: 'Your profile is saved.'});
          this.appStore.dispatch(new LoginAction());
        }
      }
    })
  }
}
