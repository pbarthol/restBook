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
  LoadUserAction,
  LoadUserSuccessAction,
  LoadUserErrorAction,
  CreateUserAction,
  CreateUserErrorAction } from './actions';
import { UserService } from './services';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private svc: UserService,) {
  }

  @Effect({dispatch: true})
  loadUser$: Observable<Action> = this.actions$
    .ofType<LoadUserAction>(LOAD_USER)
    .switchMap(() => {
      return this.svc.getUser()
        .do(res => console.log('from user service: ', res))
        .map(data => new LoadUserSuccessAction(data))
        .catch(error => Observable.of(new LoadUserErrorAction({error: error})));
    });

  @Effect({dispatch: true})
  saveUser$: Observable<Action> = this.actions$
    .ofType<CreateUserAction>(CREATE_USER)
    .map((action) => action.payload)
    .switchMap((payload) =>
      this.svc.saveUser(payload)
        .catch(error => Observable.of(new CreateUserErrorAction({ error: error })))
      );

}
