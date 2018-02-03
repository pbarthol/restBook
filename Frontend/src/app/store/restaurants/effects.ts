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
import "rxjs/add/operator/concatMap";

import {
  LOAD_RESTAURANT,
  LOAD_RESTAURANTS,
  LOAD_USER_RESTAURANTS,
  CREATE_RESTAURANT,
  UPDATE_RESTAURANT,
  CREATE_RESTAURANT_IMAGES,
  UPDATE_RESTAURANT_IMAGE,
  LOAD_RESTAURANT_IMAGES,
  REMOVE_RESTAURANT_IMAGES,
  REMOVE_RESTAURANT_IMAGE_FILE,
  LoadRestaurantAction,
  LoadRestaurantSuccessAction,
  LoadRestaurantErrorAction,
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
  UpdateRestaurantErrorAction,
  CreateRestaurantImagesAction,
  CreateRestaurantImagesSuccessAction,
  CreateRestaurantImagesErrorAction,
  RemoveRestaurantImagesAction,
  RemoveRestaurantImageFileAction,
  UpdateRestaurantImageAction,
  UpdateRestaurantImageSuccessAction,
  UpdateRestaurantImageErrorAction,
  LoadRestaurantImagesAction,
  LoadRestaurantImagesSuccessAction,
  LoadRestaurantImagesErrorAction,
  SetUserRestaurantForEditAction,
  SetNewRestaurantForEditAction,
  SetRestaurantRegisteredAction
} from './actions';
import {
  SetMessageAction,
  ShowRestaurantEditAction,
  HideRestaurantEditAction,
  HideRestaurantDetailAction
} from '../user-interface/actions';
import { RestaurantService } from './services';
import {Restaurant, RestaurantImage} from './restaurant/models';
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
  loadRestaurant$: Observable<Action> = this.actions$
    .ofType<LoadRestaurantAction>(LOAD_RESTAURANT)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.getRestaurant(payload.restaurantId)
        .do(res => console.log('Back after load restaurant: ', res))
        .switchMap((restaurant: Restaurant) =>
          Observable.from([
            new LoadRestaurantSuccessAction(restaurant),
            new LoadRestaurantImagesAction({restaurantId: restaurant._id})
          ]))
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Load Restaurant',
                message: error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });

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
  loadRestaurantImages$: Observable<Action> = this.actions$
    .ofType<LoadRestaurantImagesAction>(LOAD_RESTAURANT_IMAGES)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.getRestaurantImages(payload.restaurantId)
        .do(res => console.log('from service: ', res))
        .map(data =>  new LoadRestaurantImagesSuccessAction(data))
        .catch(error => Observable.of(new LoadRestaurantImagesErrorAction({ error: error })));
    });

  @Effect({dispatch: true})
  addRestaurant$: Observable<Action> = this.actions$
    .ofType<CreateRestaurantAction>(CREATE_RESTAURANT)
    .map((action) => action.payload)
    .switchMap((payload) => {
      payload.restaurant.userId = this.loggedInUser._id;
      return this.svc.addRestaurant(payload.restaurant)
        .do(res => console.log('Back after restaurant.save: ', res))
        .concatMap((restaurant: Restaurant) =>
          [
            new SetNewRestaurantForEditAction(restaurant),
            new CreateRestaurantSuccessAction(restaurant),
            // new HideRestaurantEditAction(),
            new LoadUserRestaurantsAction({userid: this.loggedInUser._id}),
            new SetRestaurantRegisteredAction(),
            new SetMessageAction({
              message: {
                type: 'success',
                title: 'Register Restaurant',
                message: 'New Restaurant is registered.',
                acknowledgeAction: ''
              }
            }),
            // Show edit form again for uploading pictures
            // Because id was not defined before
            // But id is necessary for uploading pictures ;-)
            new HideRestaurantEditAction(),
            new ShowRestaurantEditAction()
          ])
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
          new SetMessageAction({
            message: {
              type: 'success',
              title: 'Edit Restaurant',
              message: 'Your restaurant is updated.',
              acknowledgeAction: ''
            }
          }),
          new HideRestaurantEditAction()
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

  @Effect({dispatch: true})
  addRestaurantImage$: Observable<Action> = this.actions$
    .ofType<CreateRestaurantImagesAction>(CREATE_RESTAURANT_IMAGES)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.addRestaurantImages(payload.restaurantImages)
        .do(res => console.log('Back after restaurant image.save: ', res))
        .switchMap((restaurantImages: RestaurantImage[]) => Observable.from([
          // load all images of the detail restaurant once more
          new LoadRestaurantImagesAction({restaurantId: payload.restaurantImages[0].restaurantId}),
          // new CreateRestaurantImagesSuccessAction(restaurantImages),
          // new CreateRestaurantImageAction({restaurantImage: payload.restaurantImage}),
          new SetMessageAction({
            message: {
              type: 'success',
              title: 'Edit Restaurant',
              message: 'Your restaurant images are uploaded.',
              acknowledgeAction: ''
            }
          }),
          new LoadRestaurantsAction()
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

  @Effect({dispatch: true})
  removeRestaurantImages$: Observable<any> = this.actions$
    .ofType<RemoveRestaurantImagesAction>(REMOVE_RESTAURANT_IMAGES)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.removeRestaurantImages(payload.restaurantId)
        .do(res => console.log('Back after delete restaurant images: ', res))
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Delete Restaurant Images',
                message: error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });

  @Effect({dispatch: true})
  removeRestaurantImageFile$: Observable<any> = this.actions$
    .ofType<RemoveRestaurantImageFileAction>(REMOVE_RESTAURANT_IMAGE_FILE)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.removeRestaurantImageFile(payload.imageToRemove)
        .do(res => console.log('Back after delete restaurant image file: ', res))
        .switchMap(() => Observable.from([
          new LoadRestaurantsAction(),
          new SetMessageAction({
            message: {
              type: 'success',
              title: 'Remove Restaurant Image',
              message: `Restaurant Image ${payload.imageToRemove.image} removed.`,
              acknowledgeAction: ''
            }
          }),
        ]))
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Delete Restaurant Image File',
                message: error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });
}
