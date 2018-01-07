/**
 * Created by Peter on 16.11.2017.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Restaurant } from './restaurant/models';

export const LOAD_RESTAURANTS = '[Restaurants] Load Restaurants';
export const LOAD_RESTAURANTS_SUCCESS = '[Restaurants] Load Restaurants Success';
export const LOAD_RESTAURANTS_ERROR = '[Restaurants] Load Restaurants Error';
export const LOAD_USER_RESTAURANTS = '[Restaurants] Load User Restaurants';
export const LOAD_USER_RESTAURANTS_SUCCESS = '[Restaurants] Load User Restaurants Success';
export const LOAD_USER_RESTAURANTS_ERROR = '[Restaurants] Load User Restaurants Error';

@Injectable()

export class LoadRestaurantsAction implements Action {
  readonly type = LOAD_RESTAURANTS;
  constructor(public payload: any = null) {}
}

export class LoadRestaurantsSuccessAction implements Action {
  readonly type = LOAD_RESTAURANTS_SUCCESS;
  constructor(public payload: Restaurant[]) {
  }
}

export class LoadRestaurantsErrorAction implements Action {
  readonly type = LOAD_RESTAURANTS_ERROR;
  constructor(public payload: { error: Error }) {}
}

export class LoadUserRestaurantsAction implements Action {
  readonly type = LOAD_USER_RESTAURANTS;
  constructor(public payload: { userid: string }) {}
}

export class LoadUserRestaurantsSuccessAction implements Action {
  readonly type = LOAD_USER_RESTAURANTS_SUCCESS;
  constructor(public payload: Restaurant[]) {}
}

export class LoadUserRestaurantsErrorAction implements Action {
  readonly type = LOAD_USER_RESTAURANTS_ERROR;
  constructor(public payload: { error: Error }) {}
}
export type Actions =
  LoadRestaurantsAction
  | LoadRestaurantsSuccessAction
  | LoadRestaurantsErrorAction
  | LoadUserRestaurantsAction
  | LoadUserRestaurantsSuccessAction
  | LoadUserRestaurantsErrorAction
