import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SelectItem } from 'primeng/primeng';
import { User } from '../../store/user/models';
/** Store */
import { Store } from '@ngrx/store';
import {HideRegisterAction } from '../../store/user-interface/actions';
import { CreateUserAction,
  UpdateUserAction,
  LoginAction,
  LogoutAction } from '../../store/user/actions';
import { SetMessageAction } from '../../store/user-interface/actions';
import { AppState } from '../../reducers/index';

import {Message} from 'primeng/primeng';

@Component({
  selector: 'app-user-edit',
  templateUrl: 'user-edit.component.html',
  styleUrls: ['user-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class UserEditComponent implements OnInit {

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
  private emailRequired: boolean;
  private emailError: string;
  private formTitle: String;
  private labelSaveButton: String;

  private userIsLoggedIn$: Observable<boolean>;
  private userIsLoggedIn: boolean;
  private user$: Observable<User>;
  private user: User;
  private editUser: boolean;

  constructor(private appStore: Store<AppState>) {
    this.firstNameRequired = false;
    this.lastNameRequired = false;
    this.streetRequired = false;
    this.passwordRequired = false;
    this.passwordRepeatRequired = false;
    this.userNameRequired = false;
    this.emailRequired = false;
    this.userIsLoggedIn$ = this.appStore.select(state => state.user.userIsLoggedIn);
    this.userIsLoggedIn = false;
    this.user$ = this.appStore.select(state => state.user.user);
    this.emailError = ''
    // this.errorMessage$ = this.appStore.select(state => state.user.error);
  }

  ngOnInit() {
    this.salutations = [];
    this.salutations.push({label: 'Select Salutation', value: 0});
    this.salutations.push({label: 'Herr', value: 'Herr'});
    this.salutations.push({label: 'Frau', value: 'Frau'});
    // this.errorMessage$.subscribe(error => {
    //   if (error !== undefined && error !== null) {
    //     this.msgs = [];
    //     this.msgs.push({severity: 'error', summary: 'Error Message', detail: error['error']});
    //   }
    // });
    this.userIsLoggedIn$.subscribe(loggedIn => {this.userIsLoggedIn = loggedIn});
    if (this.userIsLoggedIn){
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
  }

  hideRegister() {
    this.appStore.dispatch(new HideRegisterAction()); // set registerIsVisible false
  }

  checkInputs() {
    // Check First Name input
    let failure: boolean = false;
    if (this.user.firstName === null ||
      this.user.firstName === undefined ||
      this.user.firstName === '') {
      this.firstNameRequired = true;
      failure = true;
    } else {
      this.firstNameRequired = false;
    }
    // Check Last Name input
    if (this.user.lastName === null ||
      this.user.lastName === undefined ||
      this.user.lastName === '') {
      this.lastNameRequired = true;
      failure = true;
    } else {
      this.lastNameRequired = false;
    }
    // Check Street input
    if (this.user.street === null ||
      this.user.street === undefined ||
      this.user.street === '') {
      this.streetRequired = true;
      failure = true;
    } else {
      this.streetRequired = false;
    }
    // Check username input
    if (this.user.username === null ||
      this.user.username === undefined ||
      this.user.username === '') {
      this.userNameRequired = true;
      failure = true;
    } else {
      this.userNameRequired = false;
    }
    // Check email input
    this.emailError = '';
    if (this.user.email === null ||
      this.user.email === undefined ||
      this.user.email === '') {
      this.emailRequired = true;
      failure = true;
    } else {
      this.emailRequired = false;
      let atPos: number = this.user.email.search('@')
      if (atPos === -1) {
        this.emailError = ' No @ found in your email address';
        failure = true;
      } else {
        if (atPos === 0 || atPos === this.user.email.length - 1) {
          this.emailError = '@ found in front or end of your email address';
          failure = true;
        }
      }
    }
    // check Passwords if user is not logged in
    if (!this.userIsLoggedIn) {
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
        new SetMessageAction({
          message: {
            type: 'error',
            title: 'Register',
            message: 'Passwords are not identical!',
            acknowledgeAction: ''
          }
        });
        failure = true;
      }
    }

    if (failure) {
      return false;
    } else {
      return true;
    }
  }

  saveUser() {
    if (!this.userIsLoggedIn) {
      // new User
      this.user._id = '0';
    }
    if (this.checkInputs()) {
      if (!this.userIsLoggedIn) {
        this.appStore.dispatch(new CreateUserAction({user: this.user}));
      } else {
        this.appStore.dispatch(new UpdateUserAction({user: this.user}));
      }
    }
  }

}
