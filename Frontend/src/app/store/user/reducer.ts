/**
 * Created by Peter on 13.12.2017.
 */

import { Action } from '@ngrx/store';
import { User } from './models';
import * as userActions from './actions';

export interface State {
  userIsLoggedIn: boolean;
  user: User;
  webtoken: string;
  userid: string;
};

const initialState: State = {
  userIsLoggedIn: false,
  user: null,
  webtoken: null,
  userid: null,
};

export function reducer(state = initialState, action: userActions.Actions) {
  switch (action.type) {
    case userActions.CREATE_USER_SUCCESS: {
      return Object.assign({}, state, { user: action.payload});
    }

    case userActions.CREATE_USER_ERROR: {
      return Object.assign({}, state, { error: action.payload.error});
    }

    case userActions.UPDATE_USER_SUCCESS: {
      return Object.assign({}, state, { user: action.payload});
    }

    case userActions.UPDATE_USER_ERROR: {
      return Object.assign({}, state, { error: action.payload.error});
    }

    case userActions.LOGIN_SUCCESS: {
      return Object.assign({}, state, {webtoken: action.payload.webtoken, userid: action.payload.userid});
    }

    case userActions.LOGIN_ERROR: {
      return Object.assign({}, state, {error: action.payload.error});
    }

    case userActions.CLEAR_ERRORS: {
      return Object.assign({}, state, {error: null});
    }

    case userActions.LOGGED_IN: {
      return Object.assign({}, state, {userIsLoggedIn: true});
    }

    case userActions.LOGOUT: {
      return Object.assign({}, state, {userIsLoggedIn: false});
    }

    case userActions.LOAD_USER_SUCCESS: {
      return Object.assign({}, state, {user: action.payload});
    }

    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => {
  console.log("getUser:", state.user);
  state.user;
}


