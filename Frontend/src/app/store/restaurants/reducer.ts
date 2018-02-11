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
  detailRestaurant: Restaurant;
  restaurantImages: RestaurantImage[];
  detailRestaurantId: string;
  restaurantRegistered:boolean;
}

const initialState: State = {
  restaurants: [],
  userRestaurants: [],
  editRestaurant: null,
  detailRestaurant: null,
  restaurantImages: [],
  detailRestaurantId: null,
  restaurantRegistered: null
};

export function reducer(state = initialState, action: restaurantsActions.Actions) {
  switch (action.type) {
    case  restaurantsActions.LOAD_RESTAURANT_SUCCESS: {
      return Object.assign({}, state, {detailRestaurant: action.payload});
    }
    case  restaurantsActions.LOAD_RESTAURANTS_SUCCESS: {
      return Object.assign({}, state, {restaurants: action.payload});
    }
    case  restaurantsActions.LOAD_USER_RESTAURANTS_SUCCESS: {
      return Object.assign({}, state, {userRestaurants: action.payload});
    }
    case restaurantsActions.SET_USER_RESTAURANT_FOR_EDIT: {
      return Object.assign({}, state, {editRestaurant: [...state.userRestaurants.filter((item, index) =>
        item._id === action.payload._id)][0]
      });
    }
    case restaurantsActions.SET_NEW_RESTAURANT_FOR_EDIT: {
      return Object.assign({}, state, {editRestaurant: action.payload});
    }
    case restaurantsActions.SET_RESTAURANT_FOR_DETAIL: {
      return Object.assign({}, state, {detailRestaurantId: action.payload});
    }
    case restaurantsActions.CREATE_RESTAURANT_IMAGES_SUCCESS: {
      return Object.assign({}, state, {
        restaurantImages: [...state.restaurantImages, action.payload] });
    }
    case  restaurantsActions.LOAD_RESTAURANT_IMAGES_SUCCESS: {
      return Object.assign({}, state, {restaurantImages: action.payload});
    }
    case restaurantsActions.SET_RESTAURANT_REGISTERED: {
      return Object.assign({}, state, {restaurantRegistered: true});
    }
    case restaurantsActions.SET_RESTAURANT_NOT_REGISTERED: {
      return Object.assign({}, state, {restaurantRegistered: false});
    }
    default:
      return state;
  }
}
