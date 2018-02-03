/**
 * Created by Peter on 27.01.2018.
 */
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Meal } from './models';

export const LOAD_MEAL = '[Meal] Load Meal';
export const LOAD_MEAL_SUCCESS = '[Meal] Load Meal Success';
export const LOAD_MEAL_ERROR = '[Meal] Load Meal Error';
export const LOAD_MEALS = '[Meals] Load Meals';
export const LOAD_MEALS_SUCCESS = '[Meals] Load Meals Success';
export const LOAD_MEALS_ERROR = '[Meals] Load Meals Error';
export const SET_MEAL_FOR_EDIT = '[Meal] Set Meal for edit';
export const CREATE_MEAL = '[Meal] Create Meal';
export const CREATE_MEAL_SUCCESS = '[Meal] Create Meal Success';
export const CREATE_MEAL_ERROR = '[Meal] Create Meal Error';
export const UPDATE_MEAL = '[Meal] Update Meal';
export const UPDATE_MEAL_SUCCESS = '[Meal] Update Meal Success';
export const UPDATE_MEAL_ERROR = '[Meal] Update Meal Error';

@Injectable()

export class LoadMealAction implements Action {
  readonly type = LOAD_MEAL;
  constructor(public payload: { mealId: string }) {}
}

export class LoadMealSuccessAction implements Action {
  readonly type = LOAD_MEAL_SUCCESS;
  constructor(public payload: Meal) {
  }
}

export class LoadMealErrorAction implements Action {
  readonly type = LOAD_MEAL_ERROR;
  constructor(public payload: { error: Error }) {}
}

export class LoadMealsAction implements Action {
  readonly type = LOAD_MEALS;
  constructor(public payload: { restaurantId: string }) {}
}

export class LoadMealsSuccessAction implements Action {
  readonly type = LOAD_MEALS_SUCCESS;
  constructor(public payload: Meal[]) {
  }
}

export class LoadMealsErrorAction implements Action {
  readonly type = LOAD_MEALS_ERROR;
  constructor(public payload: { error: Error }) {}
}

export class SetMealForEditAction implements Action {
  readonly type = SET_MEAL_FOR_EDIT;
  constructor(public payload: string) {}
}

export class CreateMealAction implements Action {
  type = CREATE_MEAL;
  constructor(public payload: { meal: Meal }) {}
}

export class CreateMealSuccessAction implements Action {
  type = CREATE_MEAL_SUCCESS;
  constructor(public payload: Meal) {}
}

export class CreateMealErrorAction implements Action {
  readonly type = CREATE_MEAL_ERROR;
  constructor(public payload: { error: string }) {}
}

export class UpdateMealAction implements Action {
  type = UPDATE_MEAL;
  constructor(public payload: { meal: Meal }) {}
}

export class UpdateMealSuccessAction implements Action {
  type = UPDATE_MEAL_SUCCESS;
  constructor(public payload: Meal) {}
}

export class UpdateMealErrorAction implements Action {
  readonly type = UPDATE_MEAL_ERROR;
  constructor(public payload: { error: string }) {}
}

export type Actions =
  LoadMealAction
    | LoadMealSuccessAction
    | LoadMealErrorAction
    | LoadMealsAction
    | LoadMealsSuccessAction
    | LoadMealsErrorAction
    | SetMealForEditAction
    | CreateMealAction
    | CreateMealSuccessAction
    | CreateMealErrorAction
    | UpdateMealAction
    | UpdateMealSuccessAction
    | UpdateMealErrorAction
