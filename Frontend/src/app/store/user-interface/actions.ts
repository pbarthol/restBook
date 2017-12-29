/**
 * Created by Peter on 13.12.2017.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export const SHOW_REGISTER = '[Register] Show Register';
export const HIDE_REGISTER = '[Register] Hide Register';
export const SHOW_LOGIN = '[Login] Show Login';
export const HIDE_LOGIN = '[Login] Hide Login';

@Injectable()

export class ShowRegisterAction implements Action {
  readonly type = SHOW_REGISTER;

  constructor() { }
}

export class HideRegisterAction implements Action {
  readonly type = HIDE_REGISTER;

  constructor() { }
}

export class ShowLoginAction implements Action {
  readonly type = SHOW_LOGIN;

  constructor() { }
}

export class HideLoginAction implements Action {
  readonly type = HIDE_LOGIN;

  constructor() { }
}

export type Actions
  = ShowRegisterAction
  | HideRegisterAction
  | ShowLoginAction
  | HideLoginAction
