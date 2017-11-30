/**
 * Created by Peter on 17.11.2017.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import "rxjs/add/operator/switchMap";

import { LOAD_RESTAURANTS,
  LoadRestaurantsSuccessAction,
  LoadRestaurantsErrorAction} from './actions';
import { GET_RESTAURANT,
  GetRestaurantSuccessAction,
  GetRestaurantErrorAction} from './restaurant/actions';
import { RestaurantService } from './services';
import { Restaurant } from './restaurant/models';

@Injectable()
export class RestaurantEffects {

  constructor (
    private actions: Actions,
    private svc: RestaurantService,
  ) {}

  @Effect()
  loadRestaurants$: Observable<Action> = this.actions
    .ofType(LOAD_RESTAURANTS)
    .map(toPayload)
    .switchMap(payload => {
      return this.svc.getRestaurants()
        .map((restaurants: Restaurant[]) => new LoadRestaurantsSuccessAction(restaurants))
        .catch(error => Observable.of(new LoadRestaurantsErrorAction({ error: error })));
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
