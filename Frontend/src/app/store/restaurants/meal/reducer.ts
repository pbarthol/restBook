/**
 * Created by Peter on 27.01.2018.
 */
import { Action } from '@ngrx/store';
import { Meal } from "./models";
import * as mealsActions from './actions';

export interface State {
  meals: Meal[];
  meal: Meal;
  editMealId: string;
  editMeal: Meal;
}

const initialState: State = {
  meals: [],
  meal: null,
  editMealId: null,
  editMeal: null
};

export function reducer(state = initialState, action: mealsActions.Actions) {
  switch (action.type) {
    // case  mealsActions.LOAD_MEAL: {
    //   return Object.assign({}, state, {meal: action.payload});
    // }
    case mealsActions.LOAD_MEALS_SUCCESS: {
      return Object.assign({}, state, {meals: action.payload});
    }
    case mealsActions.SET_MEAL_ID_FOR_EDIT: {
      return Object.assign({}, state, {editMealId: action.payload});
    }
    case mealsActions.LOAD_MEAL_FOR_EDIT: {
      return Object.assign({}, state, {editMeal: [...state.meals.filter((item, index) =>
      item._id === action.payload)][0]
      });
    }
    default:
      return state;
  }
}

// export const getRestaurants = (state: State) => state.restaurants;
