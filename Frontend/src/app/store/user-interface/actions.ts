/**
 * Created by Peter on 13.12.2017.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export const SHOW_REGISTER = '[Register] Show Register';
export const HIDE_REGISTER = '[Register] Hide Register';
export const SHOW_LOGIN = '[Login] Show Login';
export const HIDE_LOGIN = '[Login] Hide Login';
export const SET_MESSAGE = '[Messages] Set Message';
export const CLEAR_MESSAGE = '[Messages] Clear Message';

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

export class SetMessageAction implements Action {
  readonly type = SET_MESSAGE;
  constructor(public payload: {
    message:{
      type: string,
      title: string,
      message: string,
      acknowledgeAction: string
    }
  }) {}
}

export class ClearMessageAction implements Action {
  readonly type = CLEAR_MESSAGE;
  constructor(public payload: {itemIndex: number}) { }
}

// export class SetMessagesAction implements Action {
//   readonly type = SET_MESSAGES;
//   constructor(public payload: { messages: { msg: {severity: string; summary: string; detail: string;}, action: string}[] }) {}
// }
//
// export class ClearMessagesAction implements Action {
//   readonly type = CLEAR_MESSAGES;
//
//   constructor() { }
// }

export type Actions
  = ShowRegisterAction
  | HideRegisterAction
  | ShowLoginAction
  | HideLoginAction
  | SetMessageAction
  | ClearMessageAction
  // |ClearMessagesAction
