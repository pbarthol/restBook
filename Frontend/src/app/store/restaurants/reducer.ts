/**
 * Created by Peter on 16.11.2017.
 */
import { Action } from '@ngrx/store';
import {Restaurant, RestaurantImage} from "./restaurant/models";
import * as restaurantsActions from './actions';

export interface State {
  restaurants: Restaurant[];
  userRestaurants: Restaurant[];
  editRestaurant: Restaurant;
  restaurantImages: RestaurantImage[];
}

const initialState: State = {
  restaurants: [],
  userRestaurants: [],
  editRestaurant: null,
  restaurantImages: []
};

export function reducer(state = initialState, action: restaurantsActions.Actions) {
  switch (action.type) {
    case  restaurantsActions.LOAD_RESTAURANTS_SUCCESS: {
      return Object.assign({}, state, {restaurants: action.payload});
    }
    case  restaurantsActions.LOAD_USER_RESTAURANTS_SUCCESS: {
      return Object.assign({}, state, {userRestaurants: action.payload});
    }
    case restaurantsActions.SET_RESTAURANT_FOR_EDIT: {
      return Object.assign({}, state, {
        // messages: [...state.messages.filter((item, index) => index !== action.payload.itemIndex)]
        editRestaurant: [...state.userRestaurants.filter((item, index) =>
        item._id === action.payload._id)][0]
      });
    }
    case restaurantsActions.CREATE_RESTAURANT_IMAGE_SUCCESS: {
      return Object.assign({}, state, {
        restaurantImages: [...state.restaurantImages, action.payload] });
    }

    case restaurantsActions.CREATE_RESTAURANT_IMAGE_SUCCESS: {
      return Object.assign({}, state, { restaurantImages: [...state.restaurantImages, {
        restaurantId: action.payload.restaurantId,
        image: action.payload.image,
        sortorder: action.payload.sortorder
      }]
      })
    }



    case  restaurantsActions.LOAD_RESTAURANT_IMAGES_SUCCESS: {
      return Object.assign({}, state, {restaurantImages: action.payload});
    }

    default:
      return state;
  }
}

// export const getRestaurants = (state: State) => state.restaurants;
