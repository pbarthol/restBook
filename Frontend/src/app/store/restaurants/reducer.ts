/**
 * Created by Peter on 16.11.2017.
 */
import {Action} from '@ngrx/store';
import { LOAD_RESTAURANTS_SUCCESS, Actions } from "./actions";
import { Restaurant } from "./restaurant/models";

export interface RestaurantListState {
  restaurants: Restaurant[]
}

const initialState: RestaurantListState = {
  restaurants: []
}

export function reducer(state = initialState, action: Action): RestaurantListState {
  switch (action.type) {
    case  LOAD_RESTAURANTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export const getRestaurants = (state: RestaurantListState) => state.restaurants;
