/**
 * Created by Peter on 17.11.2017.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import "rxjs/add/operator/switchMap";

import {
  LOAD_RESTAURANTS,
  LOAD_USER_RESTAURANTS,
  LoadRestaurantsAction,
  LoadRestaurantsSuccessAction,
  LoadRestaurantsErrorAction,
  LoadUserRestaurantsAction,
  LoadUserRestaurantsSuccessAction,
  LoadUserRestaurantsErrorAction
} from './actions';
import { RestaurantService } from './services';
import { Restaurant } from './restaurant/models';

@Injectable()
export class RestaurantEffects {

  constructor (
    private actions$: Actions,
    private svc: RestaurantService,
  ) {}

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



  // @Effect()
  // getRestaurant$: Observable<Action> = this.actions
  //   .ofType(GET_RESTAURANT)
  //   .map(toPayload)
  //   .switchMap(id => {
  //     return this.svc.getRestaurant(id)
  //       .map(restaurant => new GetRestaurantSuccessAction({restaurant: restaurant }))
  //       .catch(error => Observable.of(new GetRestaurantErrorAction({ error: error })));
  //   });


  // @Effect() saveRestaurant$ = this.update$
  //   .ofType(RestaurantActions.SAVE_RESTAURANT)
  //   .map(action => action.payload)
  //   .switchMap(restaurant => this.svc.saveRestaurant(restaurant))
  //   .map(restaurant => this.restaurantActions.saveRestaurantsSuccess(restaurant));
  //
  // @Effect() addRestaurant$ = this.update$
  //   .ofType(RestaurantActions.ADD_RESTAURANT)
  //   .map(action => action.payload)
  //   .switchMap(restaurant => this.svc.saveRestaurant(restaurant))
  //   .map(restaurant => this.restaurantActions.addRestaurantsSuccess(restaurant));
  //
  // @Effect() deleteRestaurant$ = this.update$
  //   .ofType(RestaurantActions.DELETE_RESTAURANT)
  //   .map(action => action.payload)
  //   .switchMap(restaurant => this.svc.deleteRestaurant(restaurant))
  //   .map(restaurant => this.restaurantActions.deleteRestaurantsSuccess(restaurant));
}
