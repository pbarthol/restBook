/**
 * Created by Peter on 13.12.2017.
 */

import * as uiActions from './actions';

export interface UIState {
  showRegister: boolean;
  showLogin: boolean;
  showPasswordChange: boolean;
  showRestaurantOverview: boolean;
  showRestaurantEdit: boolean;
  showRestaurantDetail: boolean;
  messages: {
    type: string,
    title: string,
    message: string,
    acknowledgeAction: string
  }[];
  // messages: { severity: string; summary: string; detail: string; }[];
};

export const initialState: UIState = {
  showRegister: false,
  showLogin: false,
  showPasswordChange: false,
  showRestaurantOverview: false,
  showRestaurantEdit: false,
  showRestaurantDetail: false,
  messages: []
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

    case uiActions.SHOW_PASSWORD_CHANGE: {
      return Object.assign({}, state, {showPasswordChange: true});
    }

    case uiActions.HIDE_PASSWORD_CHANGE: {
      return Object.assign({}, state, {showPasswordChange: false});
    }

    case uiActions.SET_MESSAGE: {
      return Object.assign({}, state, { messages: [...state.messages, {
          type: action.payload.message.type,
          title: action.payload.message.title,
          message: action.payload.message.message,
          acknowledgeAction: action.payload.message.acknowledgeAction
        }]
      })
    }

    case uiActions.CLEAR_MESSAGE: {
      return Object.assign({}, state, {
        // messages: [...state.messages.filter((item, index) => index !== action.payload.itemIndex)]
        messages: [...state.messages.filter((item, index) =>
          item.type !== action.payload.severity ||
          item.title !== action.payload.summary ||
          item.message !== action.payload.detail)]
      });
    }

    case uiActions.SHOW_RESTAURANT_OVERVIEW: {
      return Object.assign({}, state, {showRestaurantOverview: true});
    }

    case uiActions.HIDE_RESTAURANT_OVERVIEW: {
      return Object.assign({}, state, {showRestaurantOverview: false});
    }

    case uiActions.SHOW_RESTAURANT_EDIT: {
      return Object.assign({}, state, {showRestaurantEdit: true});
    }

    case uiActions.HIDE_RESTAURANT_EDIT: {
      return Object.assign({}, state, {showRestaurantEdit: false});
    }

    case uiActions.SHOW_RESTAURANT_DETAIL: {
      return Object.assign({}, state, {showRestaurantDetail: true});
    }

    case uiActions.HIDE_RESTAURANT_DETAIL: {
      return Object.assign({}, state, {showRestaurantDetail: false});
    }

    default: {
      return state;
    }
  }
}
