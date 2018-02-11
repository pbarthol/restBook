/**
 * Created by Peter on 17.11.2017.
 */
import { Injectable } from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { AppState } from '../../../reducers/index';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/of";
import "rxjs/add/operator/switchMap";

import {
//  LOAD_MEAL,
  LOAD_MEALS,
  CREATE_MEAL,
  UPDATE_MEAL,
  REMOVE_MEAL,
//   LoadMealAction,
//   LoadMealSuccessAction,
//   LoadMealErrorAction,
  LoadMealsAction,
  LoadMealsSuccessAction,
  LoadMealsErrorAction,
  CreateMealAction,
  CreateMealSuccessAction,
  CreateMealErrorAction,
  UpdateMealAction,
  UpdateMealSuccessAction,
  UpdateMealErrorAction,
  RemoveMealAction
} from './actions';
import {
  SetMessageAction,
  HideMealEditAction,
  ShowMealOverviewAction
} from '../../user-interface/actions';
import { MealService } from './services';
import { Meal } from './models';

@Injectable()
export class MealEffects {

  constructor (
    private appStore: Store<AppState>,
    private actions$: Actions,
    private svc: MealService,
  ) {}

  // @Effect({dispatch: true})
  // loadMeal$: Observable<Action> = this.actions$
  //   .ofType<LoadMealAction>(LOAD_MEAL)
  //   .map((action) => action.payload)
  //   .switchMap((payload) => {
  //     return this.svc.getMeal(payload.mealId)
  //       .do(res => console.log('Back after load meal: ', res))
  //       .switchMap((meal: Meal) =>
  //         Observable.from([
  //           new LoadMealSuccessAction(meal)
  //         ]))
  //       .catch((error) => {
  //         if (error.status === 500) {
  //           return Observable.of(new SetMessageAction({
  //             message: {
  //               type: 'error',
  //               title: 'Load Meal',
  //               message: error.error.error,
  //               acknowledgeAction: ''
  //             }
  //           }))
  //         }
  //       })
  //   });

  @Effect({dispatch: true})
  loadMeals$: Observable<Action> = this.actions$
    .ofType<LoadMealsAction>(LOAD_MEALS)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.getMeals(payload.restaurantId)
        .do(res => console.log('from service: ', res))
        .map(data =>  new LoadMealsSuccessAction(data))
        .catch(error => Observable.of(new LoadMealsErrorAction({ error: error })));
    });

  @Effect({dispatch: true})
  addMeal$: Observable<Action> = this.actions$
    .ofType<CreateMealAction>(CREATE_MEAL)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.addMeal(payload.meal)
        .do(res => console.log('Back after meal.save: ', res))
        .concatMap((meal: Meal) => [
            new CreateMealSuccessAction(meal),
            new ShowMealOverviewAction(),
            new SetMessageAction({
              message: {
                type: 'success',
                title: 'Register Meal',
                message: 'New Meal is registered.',
                acknowledgeAction: ''
              }
            }),
            new HideMealEditAction(),
            new ShowMealOverviewAction()
          ])
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Register Meal',
                message: error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });

  @Effect({dispatch: true})
  updateMeal$: Observable<Action> = this.actions$
    .ofType<UpdateMealAction>(UPDATE_MEAL)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.updateMeal(payload.meal)
        .do(res => console.log('Back after meal.save: ', res))
        .switchMap((meal: Meal) => Observable.from([
          new UpdateMealAction({meal: meal}),
          new SetMessageAction({
            message: {
              type: 'success',
              title: 'Edit Meal',
              message: 'The Meal is updated.',
              acknowledgeAction: ''
            }
          }),
          new HideMealEditAction(),
          new ShowMealOverviewAction()
        ]))
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Edit Meal',
                message: error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });

  @Effect({dispatch: true})
  removeMeal$: Observable<any> = this.actions$
    .ofType<RemoveMealAction>(REMOVE_MEAL)
    .map((action) => action.payload)
    .switchMap((payload) => {
      return this.svc.removeMeal(payload.meal._id)
        .do(res => console.log('Back after delete meal: ', res))
        .switchMap(() => Observable.from([
          new LoadMealsAction({restaurantId: payload.meal.restaurantId}),
          new SetMessageAction({
            message: {
              type: 'success',
              title: 'Remove Meal',
              message: `Meal ${payload.meal.title} removed.`,
              acknowledgeAction: ''
            }
          }),
        ]))
        .catch((error) => {
          if (error.status === 500) {
            return Observable.of(new SetMessageAction({
              message: {
                type: 'error',
                title: 'Remove Meal',
                message: 'Remove Meal failed: ' + error.error.error,
                acknowledgeAction: ''
              }
            }))
          }
        })
    });
}
