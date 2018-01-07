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
export const CREATE_USER_SUCCESS = '[User] Create User Success';
export const CREATE_USER_ERROR = '[User] Create User Error';
export const UPDATE_USER = '[User] Update User';
export const UPDATE_USER_SUCCESS = '[User] Update User Success';
export const UPDATE_USER_ERROR = '[User] Update User Error';
export const LOGIN = '[User] Login';
export const LOGIN_SUCCESS = '[User] Login Success';
export const LOGIN_ERROR = '[User] Login Error';
export const CLEAR_ERRORS = '[User] Clear Errors';
export const LOGGED_IN = '[User] Logged in';
export const LOGOUT = '[User] Logout';
export const CHANGE_PASSWORD = '[User] Change Password';


@Injectable()

export class LoadUserAction implements Action {
  readonly type = LOAD_USER;
  constructor(public payload: { userid: string }) { }
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

export class CreateUserAction implements Action {
  type = CREATE_USER;
  constructor(public payload: { user: User }) {}
}

export class CreateUserSuccessAction implements Action {
  type = CREATE_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class CreateUserErrorAction implements Action {
  readonly type = CREATE_USER_ERROR;
  constructor(public payload: { error: string }) {}
}

export class UpdateUserAction implements Action {
  type = UPDATE_USER;
  constructor(public payload: { user: User }) {}
}

export class UpdateUserSuccessAction implements Action {
  type = UPDATE_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class UpdateUserErrorAction implements Action {
  readonly type = UPDATE_USER_ERROR;
  constructor(public payload: { error: string }) {}
}

export class LoginAction implements Action {
  readonly type = LOGIN;
  constructor(public payload: { username: string, password: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: { webtoken: string, userid: string }) {}
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
  constructor(public payload: any = null) {}
}

export class ChangePasswordAction implements Action {
  type = CHANGE_PASSWORD;
  constructor(public payload: { user: User }) {}
}

export type Actions =
  LoadUserAction
  | LoadUserSuccessAction
  | CreateUserAction
  | CreateUserSuccessAction
  | CreateUserErrorAction
    | UpdateUserAction
    | UpdateUserSuccessAction
    | UpdateUserErrorAction
    | LoginAction
    | LoginSuccessAction
    | LoginErrorAction
    | LoggedInAction
    | LogoutAction
  | ChangePasswordAction
