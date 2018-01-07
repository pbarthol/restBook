/**
 * Created by Peter on 17.11.2017.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { AppState } from '../../reducers/index';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import "rxjs/add/operator/switchMap";

import {
  LOAD_RESTAURANTS,
  LOAD_USER_RESTAURANTS,
  CREATE_RESTAURANT,
  UPDATE_RESTAURANT,
  LoadRestaurantsAction,
  LoadRestaurantsSuccessAction,
  LoadRestaurantsErrorAction,
  LoadUserRestaurantsAction,
  LoadUserRestaurantsSuccessAction,
  LoadUserRestaurantsErrorAction,
  CreateRestaurantAction,
  CreateRestaurantSuccessAction,
  CreateRestaurantErrorAction,
  UpdateRestaurantAction,
  UpdateRestaurantSuccessAction,
  UpdateRestaurantErrorAction
} from './actions';
import {
  SetMessageAction,
  HideRestaurantDetailsAction
} from '../user-interface/actions';
import { RestaurantService } from './services';
import { Restaurant } from './restaurant/models';
import { User } from '../../store/user/models';

@Injectable()
export class RestaurantEffects {

  private loggedInUser$: Observable<User>;
  private loggedInUser: User;

  constructor (
    private appStore: Store<AppState>,
    private actions$: Actions,
    private svc: RestaurantService,
  ) {
    this.loggedInUser$ = this.appStore.select(state => state.user.user);
    this.loggedInUser$.subscribe(user => this.loggedInUser = user);
  }

  @Effect({dispatch: true})
  loadRestaurants$: Observable<Action> = this.actions$
    .ofType<LoadRestaurantsAction>(LOAD_RESTAURANTS)
    .switchMap(() => {
      return this.svc.getRestaurants()
        .do(res => console.log('from service: ', res))
        .map(data =>  new LoadRestaurantsSuccessAction(data))
        .catch(error => Observable.of(new LoadRestaurantsErrorAction({ error: error })));
    });

  @Effect({dispatch: true})
  loadUserRestaurants$: Observable<Action> = this.actions$
    .ofType<LoadUserRestaurantsAction>(LOAD_USER_RESTAURANTS)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.getUserRestaurants(payload.userid)
        .do(res => console.log('from service: ', res))
        .map(data =>  new LoadUserRestaurantsSuccessAction(data))
        .catch(error => Observable.of(new LoadUserRestaurantsErrorAction({ error: error })));
    });

  @Effect({dispatch: true})
  addRestaurant$: Observable<Action> = this.actions$
    .ofType<CreateRestaurantAction>(CREATE_RESTAURANT)
    .map((action) => action.payload)
    .switchMap((payload) => {
      payload.restaurant.userId = this.loggedInUser._id;
      return this.svc.addRestaurant(payload.restaurant)
        .do(res => console.log('Back after restaurant.save: ', res))
        .switchMap((restaurant: Restaurant) =>
          Observable.from([
            new CreateRestaurantSuccessAction(restaurant),
            new SetMessageAction({
              message: {
                type: 'success',
                title: 'Register Restaurant',
                message: 'New Restaurant is registered.',
                acknowledgeAction: ''
              }
            }),
            new HideRestaurantDetailsAction(),
            new LoadUserRestaurantsAction({userid: this.loggedInUser._id})
          ]))
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Register Restaurant',
                message: error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });

  @Effect({dispatch: true})
  updateRestaurant$: Observable<Action> = this.actions$
    .ofType<UpdateRestaurantAction>(UPDATE_RESTAURANT)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.updateRestaurant(payload.restaurant)
        .do(res => console.log('Back after restaurant.save: ', res))
        .switchMap((restaurant: Restaurant) => Observable.from([
          new UpdateRestaurantAction({restaurant: restaurant}),
          new SetMessageAction({
            message: {
              type: 'success',
              title: 'Edit Restaurant',
              message: 'Your restaurant is updated.',
              acknowledgeAction: ''
            }
          }),
          new HideRestaurantDetailsAction()
        ]))
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Edit Restaurant',
                message: error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });
}
