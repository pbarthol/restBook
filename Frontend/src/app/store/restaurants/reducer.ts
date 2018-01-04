/**
 * Created by Peter on 16.11.2017.
 */
import { Action } from '@ngrx/store';
import { Restaurant } from "./restaurant/models";
import * as restaurantsActions from './actions';

export interface State {
  restaurants: Restaurant[];
}

const initialState: State = {restaurants: []};

export function reducer(state = initialState, action: restaurantsActions.Actions) {
  switch (action.type) {
    case  restaurantsActions.LOAD_RESTAURANTS_SUCCESS: {
      return Object.assign({}, state, {restaurants: action.payload});
      // return action.payload;
    }
    default:
      return state;
  }
}

// export const getRestaurants = (state: State) => state.restaurants;
