/**
 * Created by Peter on 10.02.2018.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { AppState } from '../../../reducers/index';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/concatMap";

import {
  LOAD_OPENINGHOURS,
  CREATE_OPENINGHOURS,
  CREATE_OPENINGHOURS_SUCCESS,
  CREATE_OPENINGHOURS_ERROR,
  LoadOpeninghoursAction,
  LoadOpeninghoursSuccessAction,
  LoadOpeninghoursErrorAction,
  CreateOpeninghoursAction,
  CreateOpeninghoursSuccessAction,
  CreateOpeninghoursErrorAction,
  RemoveOpeninghoursAction, REMOVE_OPENINGHOURS
} from './actions';
import {
  SetMessageAction,
} from '../../user-interface/actions';
import { OpeninghourService } from './services';
import { Openinghour } from './models';

@Injectable()
export class OpeninghourEffects {

  constructor(private appStore: Store<AppState>,
              private actions$: Actions,
              private svc: OpeninghourService,) {
  }

  @Effect({dispatch: true})
  loadOpeninghours$: Observable<Action> = this.actions$
    .ofType<LoadOpeninghoursAction>(LOAD_OPENINGHOURS)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.getOpeninghours(payload.restaurantId)
        .do(res => console.log('from openinghour service: ', res))
        .map(data => new LoadOpeninghoursSuccessAction(data))
        .catch(error => Observable.of(new LoadOpeninghoursErrorAction({error: error})));
    });

  @Effect({dispatch: true})
  removeOpeninghours$: Observable<any> = this.actions$
    .ofType<RemoveOpeninghoursAction>(REMOVE_OPENINGHOURS)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.removeOpeninghours(payload.restaurantId)
        .do(res => console.log('Back after delete openinghours: ', res))
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Delete Openinhours',
                message: error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });

  @Effect({dispatch: true})
  addOpeninghours$: Observable<Action> = this.actions$
    .ofType<CreateOpeninghoursAction>(CREATE_OPENINGHOURS)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.addOpeninghours(payload.openinghours)
        .do(res => console.log('Back after openinghours.save: ', res))
        .switchMap((openinghours: Openinghour[]) => Observable.from([
          // load all opening hours of the detail restaurant once more
          new LoadOpeninghoursAction({restaurantId: payload.openinghours[0].restaurantId}),
          new SetMessageAction({
            message: {
              type: 'success',
              title: 'Edit Restaurant',
              message: 'Your openinghours are stored.',
              acknowledgeAction: ''
            }
          }),
        ]))
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Add Openinghours',
                message: error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });
}
