/**
 * Created by Peter on 16.11.2017.
 */
import { Action } from '@ngrx/store';
import { LOAD_RESTAURANTS_SUCCESS, Actions } from "./actions";
import { Restaurant } from "./restaurant/models";

export type ListState = Restaurant[];

const initialState: ListState = [];

export function reducer(state = initialState, action: Actions): ListState {
  switch (action.type) {
    case  LOAD_RESTAURANTS_SUCCESS:
      // return Object.assign({}, state, action.payload);
      return action.payload;
    default:
      return state;
  }
}

export const getRestaurants = (state: ListState) => state;
