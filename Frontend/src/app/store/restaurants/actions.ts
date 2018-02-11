/**
 * Created by Peter on 16.11.2017.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Restaurant, RestaurantImage } from './restaurant/models';

export const LOAD_RESTAURANT = '[Restaurant] Load Restaurant';
export const LOAD_RESTAURANT_SUCCESS = '[Restaurant] Load Restaurant Success';
export const LOAD_RESTAURANT_ERROR = '[Restaurant] Load Restaurant Error';
export const LOAD_RESTAURANTS = '[Restaurants] Load Restaurants';
export const LOAD_RESTAURANTS_SUCCESS = '[Restaurants] Load Restaurants Success';
export const LOAD_RESTAURANTS_ERROR = '[Restaurants] Load Restaurants Error';
export const LOAD_USER_RESTAURANTS = '[Restaurants] Load User Restaurants';
export const LOAD_USER_RESTAURANTS_SUCCESS = '[Restaurants] Load User Restaurants Success';
export const LOAD_USER_RESTAURANTS_ERROR = '[Restaurants] Load User Restaurants Error';
export const SET_USER_RESTAURANT_FOR_EDIT = '[Restaurant] Set User Restaurant for edit';
export const SET_RESTAURANT_FOR_DETAIL = '[Restaurant] Set User Restaurant for Detail';
export const SET_NEW_RESTAURANT_FOR_EDIT = '[Restaurant] Set new Restaurant for edit';
export const CREATE_RESTAURANT = '[Restaurant] Create Restaurant';
export const CREATE_RESTAURANT_SUCCESS = '[Restaurant] Create Restaurant Success';
export const CREATE_RESTAURANT_ERROR = '[Restaurant] Create Restaurant Error';
export const UPDATE_RESTAURANT = '[Restaurant] Update Restaurant';
export const UPDATE_RESTAURANT_SUCCESS = '[Restaurant] Update Restaurant Success';
export const UPDATE_RESTAURANT_ERROR = '[Restaurant] Update Restaurant Error';
export const CREATE_RESTAURANT_IMAGES = '[Restaurant Images] Create Restaurant Image';
export const CREATE_RESTAURANT_IMAGES_SUCCESS = '[Restaurant Images] Create Restaurant Image Success';
export const CREATE_RESTAURANT_IMAGES_ERROR = '[Restaurant Images] Create Restaurant Image Error';
export const REMOVE_RESTAURANT_IMAGES = '[Restaurant Images] Delete Restaurant Images';
export const REMOVE_RESTAURANT_IMAGE_FILE = '[Restaurant Image] Remove Restaurant Image File';
export const UPDATE_RESTAURANT_IMAGE = '[Restaurant Image] Update Restaurant Image';
export const UPDATE_RESTAURANT_IMAGE_SUCCESS = '[Restaurant Images] Update Restaurant Image Success';
export const UPDATE_RESTAURANT_IMAGE_ERROR = '[Restaurant Images] Update Restaurant Image Error';
export const LOAD_RESTAURANT_IMAGES = '[Restaurants] Load Restaurant Images';
export const LOAD_RESTAURANT_IMAGES_SUCCESS = '[Restaurants] Load Restaurant Images Success';
export const LOAD_RESTAURANT_IMAGES_ERROR = '[Restaurants] Load Restaurant Images Error';
export const SET_RESTAURANT_REGISTERED = '[Restaurants] Restaurant registered';
export const SET_RESTAURANT_NOT_REGISTERED = '[Restaurants] Restaurant not registered';

@Injectable()

export class LoadRestaurantAction implements Action {
  readonly type = LOAD_RESTAURANT;
  constructor(public payload: { restaurantId: string }) {}
}

export class LoadRestaurantSuccessAction implements Action {
  readonly type = LOAD_RESTAURANT_SUCCESS;
  constructor(public payload: Restaurant) {
  }
}

export class LoadRestaurantErrorAction implements Action {
  readonly type = LOAD_RESTAURANT_ERROR;
  constructor(public payload: { error: Error }) {}
}

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

export class SetUserRestaurantForEditAction implements Action {
  readonly type = SET_USER_RESTAURANT_FOR_EDIT;
  constructor(public payload: { _id: string }) {}
}

export class SetRestaurantForDetailAction implements Action {
  readonly type = SET_RESTAURANT_FOR_DETAIL;
  constructor(public payload: string) {}
}

export class SetNewRestaurantForEditAction implements Action {
  readonly type = SET_NEW_RESTAURANT_FOR_EDIT;
  constructor(public payload: Restaurant) {}
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

export class CreateRestaurantImagesAction implements Action {
  type = CREATE_RESTAURANT_IMAGES;
  constructor(public payload: { restaurantImages: RestaurantImage[] }) {}
}

export class CreateRestaurantImagesSuccessAction implements Action {
  type = CREATE_RESTAURANT_IMAGES_SUCCESS;
  constructor(public payload: RestaurantImage[]) {}
}

export class CreateRestaurantImagesErrorAction implements Action {
  readonly type = CREATE_RESTAURANT_IMAGES_ERROR;
  constructor(public payload: { error: string }) {}
}

export class RemoveRestaurantImagesAction implements Action {
  type = REMOVE_RESTAURANT_IMAGES;
  constructor(public payload: { restaurantId: string }) {}
}

export class RemoveRestaurantImageFileAction implements Action {
  type = REMOVE_RESTAURANT_IMAGE_FILE;
  constructor(public payload: { imageToRemove: RestaurantImage }) {}
}

export class UpdateRestaurantImageAction implements Action {
  type = UPDATE_RESTAURANT_IMAGE;
  constructor(public payload: { restaurantImage: RestaurantImage }) {}
}

export class UpdateRestaurantImageSuccessAction implements Action {
  type = UPDATE_RESTAURANT_IMAGE_SUCCESS;
  constructor(public payload: any = null) {}
}

export class UpdateRestaurantImageErrorAction implements Action {
  readonly type = UPDATE_RESTAURANT_IMAGE_ERROR;
  constructor(public payload: { error: string }) {}
}

export class LoadRestaurantImagesAction implements Action {
  readonly type = LOAD_RESTAURANT_IMAGES;
  constructor(public payload:{ restaurantId: string }) {}
}

export class LoadRestaurantImagesSuccessAction implements Action {
  readonly type = LOAD_RESTAURANT_IMAGES_SUCCESS;
  constructor(public payload: RestaurantImage[]) {
  }
}

export class LoadRestaurantImagesErrorAction implements Action {
  readonly type = LOAD_RESTAURANT_IMAGES_ERROR;
  constructor(public payload: { error: Error }) {}
}

export class SetRestaurantRegisteredAction implements Action {
  readonly type = SET_RESTAURANT_REGISTERED;
  constructor(public payload: any = null) {}
}

export class SetRestaurantNotRegisteredAction implements Action {
  readonly type = SET_RESTAURANT_NOT_REGISTERED;
  constructor(public payload: any = null) {}
}

export type Actions =
  LoadRestaurantAction
  | LoadRestaurantSuccessAction
  | LoadRestaurantErrorAction
  | LoadRestaurantsAction
  | LoadRestaurantsSuccessAction
  | LoadRestaurantsErrorAction
  | LoadUserRestaurantsAction
  | LoadUserRestaurantsSuccessAction
  | LoadUserRestaurantsErrorAction
  | SetUserRestaurantForEditAction
  | SetRestaurantForDetailAction
  | CreateRestaurantAction
  | CreateRestaurantSuccessAction
  | CreateRestaurantErrorAction
  | UpdateRestaurantAction
  | UpdateRestaurantSuccessAction
  | UpdateRestaurantErrorAction
  | CreateRestaurantImagesAction
  | CreateRestaurantImagesSuccessAction
  | CreateRestaurantImagesErrorAction
  | UpdateRestaurantImageAction
  | UpdateRestaurantImageSuccessAction
  | UpdateRestaurantImageErrorAction
  | LoadRestaurantImagesAction
  | LoadRestaurantImagesSuccessAction
  | LoadRestaurantImagesErrorAction
  | SetRestaurantRegisteredAction
  | SetRestaurantNotRegisteredAction
  | SetNewRestaurantForEditAction
  | RemoveRestaurantImagesAction
  | RemoveRestaurantImageFileAction
