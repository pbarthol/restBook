/**
 * Created by Peter on 13.12.2017.
 */

import * as uiActions from './actions';

export interface UIState {
  showRegister: boolean;
  showLogin: boolean;
  userIsLoggedIn: boolean;
};

export const initialState: UIState = {
  showRegister: false,
  showLogin: false,
  userIsLoggedIn: false,
};

export function reducer(state = initialState, action: uiActions.Actions) {
  switch (action.type) {
    case uiActions.SHOW_REGISTER: {
      return Object.assign({}, state, {showRegister: true});
    }

    case uiActions.HIDE_REGISTER: {
      return Object.assign({}, state, {showRegister: false});
    }

    case uiActions.SHOW_LOGIN: {
      return Object.assign({}, state, {showLogin: true});
    }

    case uiActions.HIDE_LOGIN: {
      return Object.assign({}, state, {showLogin: false});
    }

    case uiActions.LOGIN: {
      return Object.assign({}, state, {userIsLoggedIn: true});
    }

    case uiActions.LOGOUT: {
      return Object.assign({}, state, {userIsLoggedIn: false});
    }

    default: {
      return state;
    }
  }
}
