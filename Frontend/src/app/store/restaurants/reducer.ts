/**
 * Created by Peter on 16.11.2017.
 */
import { Action } from '@ngrx/store';
// import { LOAD_RESTAURANTS_SUCCESS, Actions } from "./actions";
import { Restaurant } from "./restaurant/models";
import * as restaurants from './actions';

export interface State {
  restaurants: Restaurant[];
}

const initialState: State = {restaurants: []};

export function reducer(state = initialState, action: restaurants.LoadRestaurantsSuccessAction) {
  switch (action.type) {
    case  restaurants.LOAD_RESTAURANTS_SUCCESS: {
      // return Object.assign({}, ...state, State:...action.payload);
      return action.payload;
    }
    default:
      return state;
  }
}

export const getRestaurants = (state: State) => state.restaurants;
