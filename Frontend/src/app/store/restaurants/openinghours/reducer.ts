/**
 * Created by Peter on 10.02.2018.
 */
import { Action } from '@ngrx/store';
import { Openinghour } from "./models";
import * as openinghoursActions from './actions';

export interface State {
  openinghours: Openinghour[];
}

const initialState: State = {
  openinghours: [],
};

export function reducer(state = initialState, action: openinghoursActions.Actions) {
  switch (action.type) {
    case openinghoursActions.LOAD_OPENINGHOURS_SUCCESS: {
      return Object.assign({}, state, {openinghours: action.payload});
    }
    default: {
      return state;
    }
  }
}
