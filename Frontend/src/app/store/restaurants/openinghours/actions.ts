/**
 * Created by Peter on 10.02.2018.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Openinghour } from './models';

export const LOAD_OPENINGHOURS = '[Openinhhours] Load Openinghours';
export const LOAD_OPENINGHOURS_SUCCESS = '[Openinhhours] Load Openinghours Success';
export const LOAD_OPENINGHOURS_ERROR = '[Openinhhours] Load Openinghours Error';
export const CREATE_OPENINGHOURS = '[Openinghour] Create Openinghours';
export const CREATE_OPENINGHOURS_SUCCESS = '[Openinghour] Create Openinghours Success';
export const CREATE_OPENINGHOURS_ERROR = '[Openinghour] Create Openinghours Error';
export const REMOVE_OPENINGHOURS = '[Openinghours] Remove Openinghours';

export class LoadOpeninghoursAction implements Action {
  readonly type = LOAD_OPENINGHOURS;
  constructor(public payload: {restaurantId: string}) {}
}

export class LoadOpeninghoursSuccessAction implements Action {
  readonly type = LOAD_OPENINGHOURS_SUCCESS;
  constructor(public payload: Openinghour[]) {
  }
}

export class LoadOpeninghoursErrorAction implements Action {
  readonly type = LOAD_OPENINGHOURS_ERROR;
  constructor(public payload: { error: Error }) {}
}

export class CreateOpeninghoursAction implements Action {
  readonly type = CREATE_OPENINGHOURS;
  constructor(public payload: {openinghours: Openinghour[]}) {}
}

export class CreateOpeninghoursSuccessAction implements Action {
  readonly type = CREATE_OPENINGHOURS_SUCCESS;
  constructor(public payload: Openinghour[]) {}
}

export class CreateOpeninghoursErrorAction implements Action {
  readonly type = CREATE_OPENINGHOURS_ERROR;
  constructor(public payload: { error: string }) {}
}

export class RemoveOpeninghoursAction implements Action {
  readonly type = REMOVE_OPENINGHOURS;
  constructor(public payload: any = null) {}
}

export type Actions =
  LoadOpeninghoursAction
    | LoadOpeninghoursSuccessAction
    | LoadOpeninghoursErrorAction
    | CreateOpeninghoursAction
    | CreateOpeninghoursSuccessAction
    | CreateOpeninghoursErrorAction
    | RemoveOpeninghoursAction
