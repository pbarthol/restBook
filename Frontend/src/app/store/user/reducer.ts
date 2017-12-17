/**
 * Created by Peter on 13.12.2017.
 */

import * as userActions from './actions';
import { User } from './models';

export interface UserState {
  user: User;
};

export const initialState: UserState = {
  user: null
};

export function reducer(state = initialState, action: userActions.Actions) {
  switch (action.type) {
    // case userActions.CREATE_USER: {
    //   return {
    //     ...state, ...{
    //       error: undefined,
    //       user: undefined
    //     }
    //   };
    // }

    default: {
      return state;
    }
  }
}

export const getUser = (state: UserState) => {
  console.log("getUser:", state.user);
  state.user;
}
