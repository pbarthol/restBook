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
export const SET_RESTAURANT_FOR_EDIT = '[Restaurant] Set Restaurant for edit';
export const CREATE_RESTAURANT = '[Restaurant] Create Restaurant';
export const CREATE_RESTAURANT_SUCCESS = '[Restaurant] Create Restaurant Success';
export const CREATE_RESTAURANT_ERROR = '[Restaurant] Create Restaurant Error';
export const UPDATE_RESTAURANT = '[Restaurant] Update Restaurant';
export const UPDATE_RESTAURANT_SUCCESS = '[Restaurant] Update Restaurant Success';
export const UPDATE_RESTAURANT_ERROR = '[Restaurant] Update Restaurant Error';

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

export class SetRestaurantForEditAction implements Action {
  readonly type = SET_RESTAURANT_FOR_EDIT;
  constructor(public payload: { _id: string }) {}
}

export class CreateRestaurantAction implements Action {
  type = CREATE_RESTAURANT;
  constructor(public payload: { restaurant: Restaurant }) {}
}

export class CreateRestaurantSuccessAction implements Action {
  type = CREATE_RESTAURANT_SUCCESS;
  constructor(public payload: Restaurant) {}
}

export class CreateRestaurantErrorAction implements Action {
  readonly type = CREATE_RESTAURANT_ERROR;
  constructor(public payload: { error: string }) {}
}

export class UpdateRestaurantAction implements Action {
  type = UPDATE_RESTAURANT;
  constructor(public payload: { restaurant: Restaurant }) {}
}

export class UpdateRestaurantSuccessAction implements Action {
  type = UPDATE_RESTAURANT_SUCCESS;
  constructor(public payload: Restaurant) {}
}

export class UpdateRestaurantErrorAction implements Action {
  readonly type = UPDATE_RESTAURANT_ERROR;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  LoadRestaurantsAction
  | LoadRestaurantsSuccessAction
  | LoadRestaurantsErrorAction
  | LoadUserRestaurantsAction
  | LoadUserRestaurantsSuccessAction
  | LoadUserRestaurantsErrorAction
  | SetRestaurantForEditAction
  | CreateRestaurantAction
  | CreateRestaurantSuccessAction
  | CreateRestaurantErrorAction
  | UpdateRestaurantAction
  | UpdateRestaurantSuccessAction
  | UpdateRestaurantErrorAction
