/**
 * Created by Peter on 16.11.2017.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Restaurant } from './restaurant/models';

// export interface ActionWithPayload<T> extends Action {
//   type: string;
//   payload: T;
// }
//

export const LOAD_RESTAURANTS = '[Restaurant] Load Restaurants';
export const LOAD_RESTAURANTS_SUCCESS = '[Restaurant] Load Restaurants Success';
export const LOAD_RESTAURANTS_ERROR = '[Restaurant] Load Restaurants Error';

@Injectable()

export class LoadRestaurantsAction implements Action {
  readonly type = LOAD_RESTAURANTS;
}

export class LoadRestaurantsSuccessAction implements Action {
  readonly type = LOAD_RESTAURANTS_SUCCESS;
  constructor(public payload: Restaurant[]) {}
}

export class LoadRestaurantsErrorAction implements Action {
  readonly type = LOAD_RESTAURANTS_ERROR;
  constructor(public payload: { error: Error }) {}
}

export type Actions =
  LoadRestaurantsSuccessAction
  | LoadRestaurantsErrorAction
  | LoadRestaurantsAction;
