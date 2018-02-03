import { Component, OnInit } from '@angular/core';
import { AppState } from '../../reducers/index';
import {Observable} from "rxjs";
import { Store } from '@ngrx/store';
import { Meal } from '../../store/restaurants/meal/models';
import {HideMealEditAction} from "../../store/user-interface/actions";
import {
  CreateMealAction,
  UpdateMealAction,
} from '../../store/restaurants/meal/actions';

@Component({
  selector: 'app-meal-edit',
  templateUrl: 'meal-edit.component.html',
  styleUrls: ['meal-edit.component.css']
})
export class MenuEditComponent implements OnInit {

  private formTitle: string;
  private labelSaveButton: string;
  private detailMealId$: Observable<string>;
  private restaurantId$: Observable<string>;
  private restaurantId: string;
  private meal: Meal;
  private addMeal: boolean;
  private titleRequired: boolean;
  private descriptionRequired: boolean;
  private priceRequired: boolean;
  private priceError: string;
  private uploadedFiles: any[] = [];

  constructor(private appStore: Store<AppState>) {
    this.detailMealId$ = this.appStore.select(state => state.meals.editMealId);
    this.restaurantId$ = this.appStore.select(state => state.restaurants.detailRestaurantId);
    this.restaurantId$.subscribe(restaurantId => {this.restaurantId = restaurantId});
    this.titleRequired = false;
    this.descriptionRequired = false;
    this.priceRequired = false;
    this.priceError = '';
  }

  ngOnInit() {
    this.detailMealId$.subscribe(mealId => {
      if (mealId === null || mealId === undefined) {
        this.meal = new Meal();
        this.meal.restaurantId = this.restaurantId;
        this.addMeal = true;
        this.formTitle = 'Register Meal';
        this.labelSaveButton = 'Register';
      } else {
        this.addMeal = false;
        this.formTitle = 'Edit Meal';
        this.labelSaveButton = 'Update';
      }
    });
  }

  checkInputs() {
    let failure: boolean = false;
    if (this.meal.title === null ||
      this.meal.title === undefined ||
      this.meal.title === '') {
      this.titleRequired = true;
      failure = true;
    } else {
      this.titleRequired = false;
    }
    if (this.meal.description === null ||
      this.meal.description === undefined ||
      this.meal.description === '') {
      this.descriptionRequired = true;
      failure = true;
    } else {
      this.descriptionRequired = false;
    }
    this.priceError = '';
    if (this.meal.price === null ||
      this.meal.price === undefined) {
      this.priceRequired = true;
      failure = true;
    } else {
      this.priceRequired = false;
      if (isNaN(this.meal.price)) {
        this.priceError = 'Price is not a Number';
        failure = true;
      }
    }

    if (failure) {
      return false;
    } else {
      return true;
    }
  }

  hideRegister() {
    this.appStore.dispatch(new HideMealEditAction());
  }

  onUpload(event) {
    let originalFileName = event.files[0].name;
    let imageName: string = originalFileName;
    let extension: string = imageName.substring(imageName.indexOf(".") + 1);
    this.meal.thumbnail = imageName.substring(0, imageName.indexOf(".")) + "_thumbnail." + extension;
  }

  saveMeal() {
    if (this.checkInputs()) {
      if (this.addMeal) {
        this.appStore.dispatch(new CreateMealAction({meal: this.meal}));
      } else {
        this.appStore.dispatch(new UpdateMealAction({meal: this.meal}));
      }
    }
  }

}
