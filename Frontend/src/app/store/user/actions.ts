/**
 * Created by Peter on 13.12.2017.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { User } from './models';

export const LOAD_USER = '[User] Load User';
export const LOAD_USER_SUCCESS = '[User] Load User Success';
export const LOAD_USER_ERROR = '[User] Load User Error';
export const CREATE_OR_EDIT_USER = '[User] Create User';
export const CREATE_OR_EDIT_USER_SUCCESS = '[User] Create User Success';
export const CREATE_OR_EDIT_USER_ERROR = '[User] Create User Error';
export const LOGIN = '[User] Login';
export const LOGIN_SUCCESS = '[User] Login Success';
export const LOGIN_ERROR = '[User] Login Error';
export const LOGGED_IN = '[User] Logged in';
export const LOGOUT = '[User] Logout';


@Injectable()

export class LoadUserAction implements Action {
  readonly type = LOAD_USER;
  constructor(public payload: {userid: string}) { }
}

export class LoadUserSuccessAction implements Action {
  readonly type = LOAD_USER_SUCCESS;
  constructor(public payload: User ) {
  }
}

export class LoadUserErrorAction implements Action {
  readonly type = LOAD_USER_ERROR;
  constructor(public payload: { error: Error }) {}
}

export class CreateOrEditUserAction implements Action {
  type = CREATE_OR_EDIT_USER;
  constructor(public payload: { user: User }) {}
}

export class CreateOrEditUserSuccessAction implements Action {
  type = CREATE_OR_EDIT_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class CreateOrEditUserErrorAction implements Action {
  readonly type = CREATE_OR_EDIT_USER_ERROR;
  constructor(public payload: { error: Error }) {}
}

export class LoginAction implements Action {
  readonly type = LOGIN;
  constructor(public payload: { username: String, password: String }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: { webtoken: String, userid: String }) {}
}

export class LoginErrorAction implements Action {
  readonly type = LOGIN_ERROR;
  constructor(public payload: { error: Error }) {}
}

export class LoggedInAction implements Action {
  readonly type = LOGGED_IN;
  constructor(public payload: any = null) {}
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
  constructor(public payload: any = null) { }
}

export type Actions =
  LoadUserAction
  | LoadUserSuccessAction
  | CreateOrEditUserAction
  | CreateOrEditUserSuccessAction
  | CreateOrEditUserErrorAction
    | LoginAction
    | LoginSuccessAction
    | LoginErrorAction
    | LoggedInAction
    | LogoutAction
