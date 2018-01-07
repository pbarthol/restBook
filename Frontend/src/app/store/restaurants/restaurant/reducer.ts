/**
 * Created by Peter on 16.11.2017.
 */
import {Action} from '@ngrx/store';

import { GET_RESTAURANT_SUCCESS, Actions } from "./actions";
import { Restaurant } from "./models";

export interface State {
  _id: string;
  name: string;
  street: string;
  streetNumber: string;
  postalCode: string;
  village: string;
  phoneNumber: string;
  webpage: string;
  foodType: string;
  teaserTitle: string;
}

const initialState: State = {
    _id: '',
    name: '',
    street: '',
    streetNumber: '',
    postalCode: '',
    village: '',
    phoneNumber: '',
    webpage: '',
    foodType: '',
    teaserTitle: '',
};

// export function reducer(state = initialState, action: Actions): RestaurantState {
//   switch (action.type) {
//     case  GET_RESTAURANT_SUCCESS:
//       return action.payload;
//     default:
//       return state;
//   }
// }
//
// export const getRestaurant = (state: RestaurantState) => state._id;

