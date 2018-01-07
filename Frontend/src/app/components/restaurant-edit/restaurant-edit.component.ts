import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AppState } from '../../reducers/index';
import {Observable} from "rxjs";
import { SelectItem } from 'primeng/primeng';
import { Store } from '@ngrx/store';
import { Restaurant } from '../../store/restaurants/restaurant/models';
import {HideRestaurantDetailsAction} from "../../store/user-interface/actions";
import {
  CreateRestaurantAction,
  CreateRestaurantSuccessAction,
  CreateRestaurantErrorAction,
  UpdateRestaurantAction,
  UpdateRestaurantSuccessAction,
  UpdateRestaurantErrorAction
} from '../../store/restaurants/actions';

@Component({
  selector: 'app-restaurant-edit',
  templateUrl: 'restaurant-edit.component.html',
  styleUrls: ['restaurant-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RestaurantEditComponent implements OnInit {

  // restaurant$: Observable<Restaurant>;
  // restaurant: Restaurant;
  private detailRestaurant$: Observable<Restaurant>;
  private restaurant: Restaurant;
  private formTitle: string;
  private labelSaveButton: string;
  private nameRequired: boolean;
  private streetRequired: boolean;
  private teaserTitleRequired: boolean;
  private teaserDescriptionRequired: boolean;
  private restaurantCategories: SelectItem[];
  private addRestaurant: boolean;

  constructor(private appStore: Store<AppState>) {
    this.nameRequired = false;
    this.streetRequired = false;
    this.detailRestaurant$ = this.appStore.select(state => state.restaurants.editRestaurant);

  }

  ngOnInit() {
    this.detailRestaurant$.subscribe(restaurant => {
      this.restaurant = restaurant;
      if (this.restaurant === null ||
        this.restaurant === undefined) {
        this.restaurant = new Restaurant();
        this.addRestaurant = true;
        this.formTitle = 'Register Restaurant';
        this.labelSaveButton = 'Register';
      } else {
        this.addRestaurant = false;
        this.formTitle = 'Edit Restaurant';
        this.labelSaveButton = 'Update';
      }
    });
    this.restaurantCategories = [];
    this.restaurantCategories.push({label: 'Select Type', value: 0});
    this.restaurantCategories.push({label: 'Meat', value: 'Meat'});
    this.restaurantCategories.push({label: 'Vegetarian', value: 'Vegatarian'});
    this.restaurantCategories.push({label: 'Vegan', value: 'Vegan'});
    // reguired fields initial
    this.nameRequired = false;
    this.streetRequired = false;
    this.teaserTitleRequired = false;
    this.teaserDescriptionRequired = false;
  }

  checkInputs() {
    return true;
  }

  saveRestaurant() {
    if (this.checkInputs()) {
      if (this.addRestaurant) {
        this.appStore.dispatch(new CreateRestaurantAction({restaurant: this.restaurant}));
      } else {
        this.appStore.dispatch(new UpdateRestaurantAction({restaurant: this.restaurant}));
      }
    }
  }

  hideRestaurantEdit() {
    this.appStore.dispatch(new HideRestaurantDetailsAction());
  }
}
