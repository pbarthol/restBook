/**
 * Created by Peter on 13.12.2017.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export const SHOW_REGISTER = '[Register] Show Register';
export const HIDE_REGISTER = '[Register] Hide Register';

@Injectable()

export class ShowRegisterAction implements Action {
  readonly type = SHOW_REGISTER;

  constructor() { }
}

export class HideRegisterAction implements Action {
  readonly type = HIDE_REGISTER;

  constructor() { }
}


export type Actions
  = ShowRegisterAction
  | HideRegisterAction
