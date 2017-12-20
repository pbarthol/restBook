/**
 * Created by Peter on 13.12.2017.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { User } from './models';

export const LOAD_USER = '[User] Load User';
export const LOAD_USER_SUCCESS = '[User] Load User Success';
export const LOAD_USER_ERROR = '[User] Load User Error';
export const CREATE_USER = '[User] Create User';
export const CREATE_USER_ERROR = '[User] Create User Error';

@Injectable()

export class LoadUserAction implements Action {
  readonly type = LOAD_USER;
}

export class LoadUserSuccessAction implements Action {
  readonly type = LOAD_USER_SUCCESS;
  constructor(public payload: User) {
    var i = 0; // just debugging
  }
}

export class LoadUserErrorAction implements Action {
  readonly type = LOAD_USER_ERROR;
  constructor(public payload: { error: Error }) {}
}

export class CreateUserAction implements Action {
  type = CREATE_USER;
  constructor(public payload: User) {}
  // constructor(public payload: User ) {}
}

export class CreateUserErrorAction implements Action {
  readonly type = CREATE_USER_ERROR;
  constructor(public payload: { error: Error }) {}
}

export type Actions
  = LoadUserAction
  | LoadUserSuccessAction
  | CreateUserAction
  | CreateUserErrorAction
