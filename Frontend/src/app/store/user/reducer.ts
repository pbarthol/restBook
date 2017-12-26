/**
 * Created by Peter on 13.12.2017.
 */

import { Action } from '@ngrx/store';
import { User } from './models';
import * as userActions from './actions';
// import {
//   UserActions,
//   CREATE_USER_SUCCESS,
//   CreateUserSuccessAction
// } from './actions';


export interface UserState {
  user: User;
};

const initialState: UserState = {
  user: null
};

export function reducer(state = initialState, action: userActions.CreateUserSuccessAction) {
  switch (action.type) {
    case userActions.CREATE_USER_SUCCESS: {
      return Object.assign({}, state, { user: action.payload});
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: UserState) => {
  console.log("getUser:", state.user);
  state.user;
}
