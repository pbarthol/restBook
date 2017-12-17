/**
 * Created by Peter on 13.12.2017.
 */

import * as uiActions from './actions';

export interface UIState {
  registerVisible: boolean;
};

export const initialState: UIState = {
  registerVisible: false
};

export function reducer(state = initialState, action: uiActions.Actions) {
  switch (action.type) {
    case uiActions.SHOW_REGISTER: {
      return {registerVisible: true}
      // return true
    }

    case uiActions.HIDE_REGISTER: {
      return {registerVisible: false}
      // return false;
    }

    default: {
      return state;
    }
  }
}

export const getRegisterVisible = (state: UIState) => {
  console.log("getRegisterVisible:", state.registerVisible);
  state.registerVisible;
}
