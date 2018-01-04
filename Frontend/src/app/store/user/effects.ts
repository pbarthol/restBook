/**
 * Created by Peter on 17.12.2017.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import "rxjs/add/operator/switchMap";

import {
  LOAD_USER,
  CREATE_USER,
  UPDATE_USER,
  LOGIN,
  CHANGE_PASSWORD,
  LoadUserAction,
  LoadUserSuccessAction,
  LoadUserErrorAction,
  CreateUserAction,
  CreateUserSuccessAction,
  UpdateUserAction,
  UpdateUserSuccessAction,
  LoginAction,
  LoginSuccessAction,
  LoggedInAction,
  ChangePasswordAction
} from './actions';
import {
  SetMessageAction,
  HideLoginAction,
  HideRegisterAction,
  HidePasswordChangeAction
} from '../user-interface/actions';
import { UserService } from './services';
import { User } from './models';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private svc: UserService,) {
  }

  @Effect({dispatch: true})
  loadUser$: Observable<Action> = this.actions$
    .ofType<LoadUserAction>(LOAD_USER)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.getUser(payload.userid)
        .do(res => console.log('from user service: ', res))
        .map(data => new LoadUserSuccessAction(data))
        .catch(error => Observable.of(new LoadUserErrorAction({error: error})));
    });

  @Effect({dispatch: true})
  addUser$: Observable<Action> = this.actions$
    .ofType<CreateUserAction>(CREATE_USER)
    .map((action) => action.payload)
    .switchMap((payload) => {
      let pwd = payload.user.password; // not hashed
      return this.svc.addUser(payload.user)
        .do(res => console.log('Back after user.save: ', res))
        .switchMap((user: User) =>
          Observable.from([
          new CreateUserSuccessAction(user),
          new SetMessageAction({
            message: {
              type: 'success',
              title: 'Register',
              message: 'Your profile is registered.',
              acknowledgeAction: ''
            }
          }),
          new LoginAction({username: user.username, password: pwd}),
          new HideRegisterAction()
        ]))
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Register Profile',
                message: error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });

  @Effect({dispatch: true})
  updateUser$: Observable<Action> = this.actions$
    .ofType<UpdateUserAction>(UPDATE_USER)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.updateUser(payload.user)
        .do(res => console.log('Back after user.save: ', res))
        .switchMap((user: User) => Observable.from([
          new UpdateUserSuccessAction(user),
          new SetMessageAction({
            message: {
              type: 'success',
              title: 'Edit Profile',
              message: 'Your profile is updated.',
              acknowledgeAction: 'HideRegisterAction'
            }
          }),
          new HideRegisterAction()
        ]))
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Edit Profile',
                message: error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });

  @Effect({dispatch: true})
  changePasswords: Observable<Action> = this.actions$
    .ofType<ChangePasswordAction>(CHANGE_PASSWORD)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.updateUser(payload.user)
        .do(res => console.log('Back after user.change password: ', res))
        .switchMap((user: User) => Observable.from([
          new SetMessageAction({
            message: {
              type: 'success',
              title: 'Change Password',
              message: 'Your password is changed.',
              acknowledgeAction: 'HideChangePassword'
            }
          }),
          new HidePasswordChangeAction()
        ]))
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Change Password',
                message: error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });

  @Effect({dispatch: true})
  loginUser$: Observable<Action> = this.actions$
    .ofType<LoginAction>(LOGIN)
    .map((action) => action.payload)
    .switchMap(payload => {
      return this.svc.login(payload.username, payload.password)
        .do(res => console.log('Login: ', res))
        .switchMap((res) => Observable.from([
          new LoginSuccessAction({webtoken: res.token, userid: res.userid}),
          new LoadUserAction({userid: res.userid}),
          new LoggedInAction(),
          new SetMessageAction({
            message: {
              type: 'success',
              title: 'Login',
              message: 'Your are logged in.',
              acknowledgeAction: ''
            }
          }),
          new HideLoginAction()
        ]))
        .catch((error) => {
          if (error.status === 500 || error.status === 403) {
            // return Observable.of(new LoginErrorAction({error: error.error}))
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Login',
                message: error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });
}
