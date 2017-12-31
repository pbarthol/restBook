import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';
import { User } from '../../store/user/models';
/** Store */
import { Store } from '@ngrx/store';
import {HideRegisterAction } from '../../store/user-interface/actions';
import { UserState } from '../../store/user/reducer';
import { CreateOrEditUserAction, LoginAction, LogoutAction } from '../../store/user/actions';
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
  private errorDetected: boolean;
  // private selectedSalutation: string;
  private salutations: SelectItem[];
  private passwordRepeat: String;
  /** Input checks */
  private firstNameRequired: boolean;
  private lastNameRequired: boolean;
  private streetRequired: boolean;
  private passwordRequired: boolean;
  private passwordRepeatRequired: boolean;
  private userNameRequired: boolean;
  private formTitle: String;
  private labelSaveButton: String;

  private userIsLoggedIn$: Observable<boolean>;
  private user$: Observable<User>;
  private user: User;
  private editUser: boolean;
  private errorMessage$: Observable<string>;

  constructor(private appStore: Store<AppState>) {
    this.firstNameRequired = false;
    this.lastNameRequired = false;
    this.streetRequired = false;
    this.passwordRequired = false;
    this.passwordRepeatRequired = false;
    this.userNameRequired = false;
    this.userIsLoggedIn$ = this.appStore.select(state => state.user.userIsLoggedIn);
    this.user$ = this.appStore.select(state => state.user.user);
    this.errorMessage$ = this.appStore.select(state => state.user.error);
  }

  ngOnInit() {
    this.errorDetected = false;
    this.salutations = [];
    this.salutations.push({label: 'Select Salutation', value: 0});
    this.salutations.push({label: 'Herr', value: 'Herr'});
    this.salutations.push({label: 'Frau', value: 'Frau'});
    this.errorMessage$.subscribe(error => {
      if (error !== undefined && error !== null) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: 'Error Message', detail: error['error']});
        this.errorDetected = true;
      }
    });
    this.userIsLoggedIn$.subscribe(loggedIn => {
      if (loggedIn){
        this.user$.subscribe(user => this.user = user);
        this.editUser = true;
        this.formTitle = 'Update Profile';
        this.labelSaveButton = 'Update Profile';
        // password is hashed -> not usable, not editable
        this.user.password = '';
        this.passwordRepeat = '';
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

    if (this.user.username === null ||
      this.user.username === undefined ||
      this.user.username === '') {
      this.userNameRequired = true;
      failure = true;
    } else {
      this.userNameRequired = false;
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
        // new User
        this.user._id = '0';
      }
      if (this.checkInputs()) {
        this.appStore.dispatch(new CreateOrEditUserAction({user: this.user}));
        // show success save message
        this.user$.subscribe(user => {
          if (user !== null) {
            this.msgs = [];
            if (!loggedIn) {
              this.msgs.push({severity: 'success', summary: 'Registering', detail: 'Your profile is registered.'});
            } else {
              this.msgs.push({severity: 'success', summary: 'Edit User', detail: 'Your profile is updated.'});
            }
          }
        })
      }
    })
  }

  clearErrors() {
    this.errorDetected = false;
  }
}
