/**
 * Created by Peter on 16.11.2017.
 */
import {Action} from '@ngrx/store';

import { GET_RESTAURANT_SUCCESS, Actions } from "./actions";
import { Restaurant } from "./models";

export type RestaurantState = Restaurant;

const initialState: RestaurantState = {
  _id: '',
  name: '',
  street: '',
  streetNumber: '',
  postalCode: '',
  village: '',
  phoneNumber: '',
  webpage: ''
};

export function reducer(state = initialState, action: Action): RestaurantState {
  switch (action.type) {
    case  GET_RESTAURANT_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export const getRestaurant = (state: RestaurantState) => state._id;

