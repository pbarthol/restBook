import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '../../reducers/index';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import {
  LoadMealsAction,
  SetMealForEditAction
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
  private meals$: Observable<Meal[]>;
  private meals: Meal[];
  private selectedMeal: Meal;

  constructor(private appStore: Store<AppState>) {
    this.meals$ = appStore.select(state => state.meals.meals);
  }

  ngOnInit() {
    this.appStore.dispatch(new LoadMealsAction({ restaurantId: this.restaurantId }));
    this.meals$.subscribe(meals => this.meals = meals);
  }

  addMeal() {
    this.appStore.dispatch(new SetMealForEditAction(null));
    this.appStore.dispatch(new HideMealOverviewAction());
    this.appStore.dispatch(new ShowMealEditAction());
  }

  hideMealOverview() {
    this.appStore.dispatch(new HideMealOverviewAction());
  }

}
