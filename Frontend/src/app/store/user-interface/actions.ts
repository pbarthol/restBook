/**
 * Created by Peter on 13.12.2017.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export const SHOW_REGISTER = '[Register] Show Register';
export const HIDE_REGISTER = '[Register] Hide Register';
export const SHOW_LOGIN = '[Login] Show Login';
export const HIDE_LOGIN = '[Login] Hide Login';
export const SHOW_PASSWORD_CHANGE = '[Password] Show Change Password';
export const HIDE_PASSWORD_CHANGE = '[Password] Hide Change Password';
export const SET_MESSAGE = '[Messages] Set Message';
export const CLEAR_MESSAGE = '[Messages] Clear Message';
export const SHOW_RESTAURANT_OVERVIEW = '[Restaurants] Show Overview'
export const HIDE_RESTAURANT_OVERVIEW = '[Restaurants] Hide Overview'
export const SHOW_RESTAURANT_DETAILS = '[Restaurant] Show Details'
export const HIDE_RESTAURANT_DETAILS = '[Restaurant] Hide Details'

@Injectable()

export class ShowRegisterAction implements Action {
  readonly type = SHOW_REGISTER;
  constructor(public payload: any = null) { }
}

export class HideRegisterAction implements Action {
  readonly type = HIDE_REGISTER;
  constructor(public payload: any = null) { }
}

export class ShowLoginAction implements Action {
  readonly type = SHOW_LOGIN;
  constructor(public payload: any = null) { }
}

export class HideLoginAction implements Action {
  readonly type = HIDE_LOGIN;
  constructor(public payload: any = null) { }
}

export class ShowPasswordChangeAction implements Action {
  readonly type = SHOW_PASSWORD_CHANGE;
  constructor(public payload: any = null) { }
}

export class HidePasswordChangeAction implements Action {
  readonly type = HIDE_PASSWORD_CHANGE;
  constructor(public payload: any = null) { }
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
  // constructor(public payload: {itemIndex: number}) { }
  constructor(public payload: {severity: string, summary: string, detail: string}) { }
}

export class ShowRestaurantOverviewAction implements Action {
  readonly type = SHOW_RESTAURANT_OVERVIEW;
  constructor(public payload: any = null) { }
}

export class HideRestaurantOverviewAction implements Action {
  readonly type = HIDE_RESTAURANT_OVERVIEW;
  constructor(public payload: any = null) { }
}

export class ShowRestaurantDetailsAction implements Action {
  readonly type = SHOW_RESTAURANT_DETAILS;
  constructor(public payload: any = null) { }
}

export class HideRestaurantDetailsAction implements Action {
  readonly type = HIDE_RESTAURANT_DETAILS;
  constructor(public payload: any = null) { }
}

export type Actions
  = ShowRegisterAction
  | HideRegisterAction
  | ShowLoginAction
  | HideLoginAction
  | SetMessageAction
  | ClearMessageAction
  | ShowPasswordChangeAction
  | HidePasswordChangeAction
  | ShowRestaurantOverviewAction
  | HideRestaurantOverviewAction
  | ShowRestaurantDetailsAction
  | HideRestaurantDetailsAction
