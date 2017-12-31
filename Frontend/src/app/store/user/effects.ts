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
  CREATE_OR_EDIT_USER,
  LOGIN,
  LoadUserAction,
  LoadUserSuccessAction,
  LoadUserErrorAction,
  CreateOrEditUserAction,
  CreateOrEditUserSuccessAction,
  CreateOrEditUserErrorAction,
  LoginAction,
  LoginSuccessAction,
  LoginErrorAction,
  LoggedInAction
} from './actions';
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
  saveUser$: Observable<Action> = this.actions$
    .ofType<CreateOrEditUserAction>(CREATE_OR_EDIT_USER)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.saveUser(payload.user)
        .do(res => console.log('Back after user.save: ', res))
        .switchMap((user: User) => Observable.from([
          new CreateOrEditUserSuccessAction(user),
          new LoginAction({username: user.username, password: user.password})
        ]))
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new CreateOrEditUserErrorAction({error: error.error}))
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
          new LoggedInAction()
        ]))
        .catch((error) => {
          if (error.status === 500 || error.status === 403) {
            return Observable.of(new LoginErrorAction({error: error.error}))
          }
        })
    });
}
