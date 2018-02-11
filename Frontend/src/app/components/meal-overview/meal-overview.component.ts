import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '../../reducers/index';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import {
  LoadMealsAction,
  SetMealIdForEditAction,
  RemoveMealAction,
  UpdateMealAction,
  LoadMealForEditAction
} from '../../store/restaurants/meal/actions';
import { Meal } from '../../store/restaurants/meal/models';
import {
  HideMealOverviewAction,
  ShowMealEditAction,
} from '../../store/user-interface/actions';

@Component({
  selector: 'app-meal-overview',
  templateUrl: './meal-overview.component.html',
  styleUrls: ['./meal-overview.component.css']
})
export class MealOverviewComponent implements OnInit {

  @Input() restaurantId;
  @Input() mode;
  private meals$: Observable<Meal[]>;
  private selectedMeal: Meal;
  private deleteMealDialogVisible: boolean;
  private mealToRemove: Meal;
  private showButtons: boolean;

  constructor(private appStore: Store<AppState>) {
    this.meals$ = appStore.select(state => state.meals.meals);
    this.deleteMealDialogVisible = false;
    this.mealToRemove = null;
    this.showButtons = false;
  }

  ngOnInit() {
    if (this.mode === 'edit') {
      this.showButtons = true;
    }
    this.appStore.dispatch(new LoadMealsAction({ restaurantId: this.restaurantId }));
  }

  addMeal() {
    this.appStore.dispatch(new SetMealIdForEditAction(null));
    this.appStore.dispatch(new HideMealOverviewAction());
    this.appStore.dispatch(new ShowMealEditAction());
  }

  hideMealOverview() {
    this.appStore.dispatch(new HideMealOverviewAction());
  }

  updateMeal(mealId: string) {
    this.appStore.dispatch(new SetMealIdForEditAction(mealId));
    this.appStore.dispatch(new LoadMealForEditAction(mealId));
    this.appStore.dispatch(new HideMealOverviewAction());
    this.appStore.dispatch(new ShowMealEditAction());
  }

  removeMeal(meal: Meal) {
    this.mealToRemove = meal;
    this.deleteMealDialogVisible = true; // show dialog
  }

  removeMealDefinitly() {
    this.appStore.dispatch(new RemoveMealAction({ meal: this.mealToRemove }));
    // this.appStore.dispatch(new LoadMealsAction({ restaurantId: this.restaurantId }));
    this.cancelRemoveMeal();
  }

  cancelRemoveMeal() {
    this.mealToRemove = null;
    this.deleteMealDialogVisible = false; // hide dialog
  }


}
