/**
 * Created by Peter on 16.11.2017.
 */
import { Action } from '@ngrx/store';
import { LOAD_RESTAURANTS_SUCCESS, Actions } from "./actions";
import { Restaurant } from "./restaurant/models";

export type State = Restaurant[];

const initialState: State = [];

export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case  LOAD_RESTAURANTS_SUCCESS: {
      // return Object.assign({}, state, action.payload.restaurants);
      return Object.assign({}, state, {state: action.payload});
      // return action.payload;
      // return {...state, restaurants: action.payload.restaurants};
    }
    default:
      return state;
  }
}

export const getRestaurants = (state: State) => state;
