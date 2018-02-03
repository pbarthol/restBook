/**
 * Created by Peter on 16.11.2017.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Restaurant } from './models';

export const GET_RESTAURANT = '[Restaurant] Get Restaurant';
export const GET_RESTAURANT_SUCCESS = '[Restaurant] Get Restaurant Success';
export const GET_RESTAURANT_ERROR = '[Restaurant] Get Restaurant Error';
export const RESET_BLANK_RESTAURANT = '[Restaurant] Reset Blank Restaurant';
export const SAVE_RESTAURANT = '[Restaurant] Save Restaurant';
export const SAVE_RESTAURANT_SUCCESS = '[Restaurant] Save Restaurant Success';
export const ADD_RESTAURANT = '[Restaurant] Add Restaurant';
export const ADD_RESTAURANT_SUCCESS = '[Restaurant] Add Restaurant Success';
export const DELETE_RESTAURANT = '[Restaurant] Delete Restaurant';
export const DELETE_RESTAURANT_SUCCESS = '[Restaurant] Delete Restaurant Success';

@Injectable()

export class GetRestaurantSuccessAction implements Action {
  readonly type = GET_RESTAURANT_SUCCESS;
  constructor(public payload: { restaurant: null }) {}
}

export class GetRestaurantErrorAction implements Action {
  readonly type = GET_RESTAURANT_ERROR;
  constructor(public payload: { error: Error }) {}
}

  // loadRestaurants(): Action {
  //   return {
  //     type: LOAD_RESTAURANTS
  //   };
  // }
  //
  // loadRestaurantsSuccess(restaurants): Action {
  //   return {
  //     type: LOAD_RESTAURANTS_SUCCESS,
  //     payload: restaurants
  //   };
  // }
  //
  // getRestaurant(id): Action {
  //   return {
  //     type: GET_RESTAURANT,
  //     payload: id
  //   };
  // }
  //
  // getRestaurantSuccess(restaurant): Action {
  //   return {
  //     type: GET_RESTAURANT_SUCCESS,
  //     payload: restaurant
  //   };
  // }
  //
  // resetBlankRestaurant(): Action {
  //   return {
  //     type: RESET_BLANK_RESTAURANT
  //   };
  // }
  //
  // saveRestaurants(restaurant): Action {
  //   return {
  //     type: SAVE_RESTAURANT,
  //     payload: restaurant
  //   };
  // }
  //
  // saveRestaurantsSuccess(restaurant): Action {
  //   return {
  //     type: SAVE_RESTAURANT_SUCCESS,
  //     payload: restaurant
  //   };
  // }
  //
  // static ADD_RESTAURANT = '[Restaurant] Add Restaurant';
  // addRestaurants(restaurant): Action {
  //   return {
  //     type: ADD_RESTAURANT,
  //     payload: restaurant
  //   };
  // }
  //
  // static ADD_RESTAURANT_SUCCESS = '[Restaurant] Add Restaurant Success';
  // addRestaurantsSuccess(restaurant): Action {
  //   return {
  //     type: ADD_RESTAURANT_SUCCESS,
  //     payload: restaurant
  //   };
  // }
  //
  // static DELETE_RESTAURANT = '[Restaurant] Delete Restaurant';
  // deleteRestaurants(restaurant): Action {
  //   return {
  //     type: DELETE_RESTAURANT,
  //     payload: restaurant
  //   };
  // }
  //
  // static DELETE_RESTAURANT_SUCCESS = '[Restaurant] Delete Restaurant Success';
  // deleteRestaurantsSuccess(restaurant): Action {
  //   return {
  //     type: DELETE_RESTAURANT_SUCCESS,
  //     payload: restaurant
  //   };
  // }
// }
export type Actions =
  GetRestaurantSuccessAction
  | GetRestaurantErrorAction;
