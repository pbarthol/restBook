import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AppState } from '../../reducers/index';
import {Observable} from "rxjs";
import { SelectItem } from 'primeng/primeng';
import { Store } from '@ngrx/store';
import {Restaurant, RestaurantImage} from '../../store/restaurants/restaurant/models';
import {HideRestaurantDetailsAction} from "../../store/user-interface/actions";
import {
  CreateRestaurantAction,
  CreateRestaurantSuccessAction,
  CreateRestaurantErrorAction,
  UpdateRestaurantAction,
  UpdateRestaurantSuccessAction,
  UpdateRestaurantErrorAction,
  UpdateRestaurantImageAction,
  CreateRestaurantImagesAction,
  LoadRestaurantImagesAction
} from '../../store/restaurants/actions';
import {
  SetMessageAction
} from '../../store/user-interface/actions';

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
  private streetNumberRequired: boolean;
  private postalcodeRequired: boolean;
  private villageRequired: boolean;
  private teaserTitleRequired: boolean;
  private teaserDescriptionRequired: boolean;
  private restaurantCategories: SelectItem[];
  private addRestaurant: boolean;
  private uploadedFiles: any[] = [];
  private restaurantImages: RestaurantImage[] = [];

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
        this.appStore.dispatch(new LoadRestaurantImagesAction({restaurantId: this.restaurant._id}));
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
    let failure: boolean = false;
    if (this.restaurant.name === null ||
      this.restaurant.name === undefined ||
      this.restaurant.name === '') {
      this.nameRequired = true;
      failure = true;
    } else {
      this.nameRequired = false;
    }
    if (this.restaurant.street === null ||
      this.restaurant.street === undefined ||
      this.restaurant.street === '') {
      this.streetRequired = true;
      failure = true;
    } else {
      this.streetRequired = false;
    }
    if (this.restaurant.streetNumber === null ||
      this.restaurant.streetNumber === undefined ||
      this.restaurant.streetNumber === '') {
      this.streetNumberRequired = true;
      failure = true;
    } else {
      this.streetNumberRequired = false;
    }
    if (this.restaurant.postalCode === null ||
      this.restaurant.postalCode === undefined ||
      this.restaurant.postalCode === '') {
      this.postalcodeRequired = true;
      failure = true;
    } else {
      this.postalcodeRequired = false;
    }
    if (this.restaurant.village === null ||
      this.restaurant.village === undefined ||
      this.restaurant.village === '') {
      this.villageRequired = true;
      failure = true;
    } else {
      this.villageRequired = false;
    }
    if (this.restaurant.teaserTitle === null ||
      this.restaurant.teaserTitle === undefined ||
      this.restaurant.teaserTitle === '') {
      this.teaserTitleRequired = true;
      failure = true;
    } else {
      this.teaserTitleRequired = false;
    }
    if (this.restaurant.teaserDescription === null ||
      this.restaurant.teaserDescription === undefined ||
      this.restaurant.teaserDescription === '') {
      this.teaserDescriptionRequired = true;
      failure = true;
    } else {
      this.teaserDescriptionRequired = false;
    }

    if (failure) {
      return false;
    } else {
      return true;
    }
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

  onUpload(event) {

    event.files.forEach((file, index) => {
      this.uploadedFiles.push(file);
      let originalFileName = file.name;
      let restaurantImage = new RestaurantImage;
      restaurantImage.restaurantId = this.restaurant._id;
      restaurantImage.image = originalFileName;
      restaurantImage.sortorder = index;
      this.restaurantImages.push(restaurantImage);
    });
    this.appStore.dispatch(new CreateRestaurantImagesAction({restaurantImages: this.restaurantImages}));
    // for(let file of event.files) {
    //   this.uploadedFiles.push(file);
    //   let originalFileName = file.name;
    //   let restaurantImage = new RestaurantImage;
    //   restaurantImage.restaurantId = this.restaurant._id;
    //   restaurantImage.image = originalFileName;
    //   this.appStore.dispatch(new CreateRestaurantImageAction({restaurantImage: restaurantImage}));
    // }
  }
}
