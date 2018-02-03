import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AppState } from '../../reducers/index';
import {Observable} from "rxjs";
import { SelectItem } from 'primeng/primeng';
import { Store } from '@ngrx/store';
import {Restaurant, RestaurantImage} from '../../store/restaurants/restaurant/models';
import {HideRestaurantEditAction} from "../../store/user-interface/actions";
import {
  CreateRestaurantAction,
  CreateRestaurantSuccessAction,
  CreateRestaurantErrorAction,
  UpdateRestaurantAction,
  UpdateRestaurantSuccessAction,
  UpdateRestaurantErrorAction,
  UpdateRestaurantImageAction,
  CreateRestaurantImagesAction,
  LoadRestaurantImagesAction,
  SetRestaurantRegisteredAction,
  SetRestaurantNotRegisteredAction, RemoveRestaurantImagesAction, RemoveRestaurantImageFileAction
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
  private detailRestaurantImages$: Observable<RestaurantImage[]>;
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
  private restaurantImagesBeforeUpdate: RestaurantImage[] = [];
  private restaurantImagesUpdated: RestaurantImage[] = [];
  private targetPictures: any[];

  constructor(private appStore: Store<AppState>) {
    this.nameRequired = false;
    this.streetRequired = false;
    this.detailRestaurant$ = this.appStore.select(state => state.restaurants.editRestaurant);
    this.detailRestaurantImages$ = this.appStore.select(state => state.restaurants.restaurantImages);
    this.detailRestaurantImages$.subscribe(restImages => {this.restaurantImages = restImages});
    console.log("Anzahl Images: ", this.restaurantImages.length);
  }

  ngOnInit() {
    this.detailRestaurant$.subscribe(restaurant => {
      this.restaurant = restaurant;
      if (this.restaurant === null ||
        this.restaurant === undefined) {
        // add restaurant
        this.appStore.dispatch(new SetRestaurantNotRegisteredAction());
        this.restaurant = new Restaurant();
        this.addRestaurant = true;
        this.formTitle = 'Register Restaurant';
        this.labelSaveButton = 'Register';
      } else {
        // update restaurant
        this.restaurantImagesBeforeUpdate = this.restaurantImages.slice(0);
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
    this.restaurantImagesUpdated = [];
    this.restaurantImagesBeforeUpdate = [];
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
        this.updateImagesRegistration();
        this.appStore.dispatch(new UpdateRestaurantAction({restaurant: this.restaurant}));
      }
    }
  }

  updateImagesRegistration() {
    if ( this.restaurantImagesBeforeUpdate = this.restaurantImages ){
      // are there images to remove?
      // update image objects because of possible changed sortorder
      this.restaurantImages.forEach((image, index) => {
        image.sortorder = index;
        this.restaurantImagesUpdated.push(image);
        if (index === 0) {
          this.restaurant.thumbnail = image.thumbnail; // for later update Restaurant
          this.restaurant.teaserImage = image.teaserImage; // for later update Restaurant
        }
      });
      this.appStore.dispatch(new RemoveRestaurantImagesAction({restaurantId: this.restaurant._id}));
      this.appStore.dispatch(new CreateRestaurantImagesAction({restaurantImages: this.restaurantImages}));
    }
  }

  removeImage(imageToRemove) {
    let index = this.restaurantImages.indexOf(imageToRemove, 0);
    if (index > -1) {
      this.restaurantImages.splice(index, 1);
    }
    this.appStore.dispatch(new RemoveRestaurantImageFileAction({imageToRemove: imageToRemove}));
  }

  cancelRestaurantEdit() {
    this.appStore.dispatch(new HideRestaurantEditAction());
  }

  onUpload(event) {
    // get max sortorder of images
    var maxOrder: number;
    if (this.restaurantImages.length != 0) {
      // Calculate next sortorder
      this.restaurantImages.sort(function (a, b) {
        return a.sortorder - b.sortorder
      });
      maxOrder = this.restaurantImages[this.restaurantImages.length - 1].sortorder;
      maxOrder++;
    } else  {
      maxOrder = 0
    };
    this.restaurantImages = [];
    event.files.forEach((file, index) => {
      this.uploadedFiles.push(file);
      let originalFileName = file.name;
      let restaurantImage = new RestaurantImage;
      restaurantImage.restaurantId = this.restaurant._id;
      let imageName: string = originalFileName;
      let extension: string = imageName.substring(imageName.indexOf(".") + 1);
      restaurantImage.image = imageName.substring(0, imageName.indexOf(".")) + "_resized." + extension;
      restaurantImage.thumbnail = imageName.substring(0, imageName.indexOf(".")) + "_thumbnail." + extension;
      restaurantImage.teaserImage = imageName.substring(0, imageName.indexOf(".")) + "_teaser." + extension;
      restaurantImage.sortorder = maxOrder + index;
      this.restaurantImages.push(restaurantImage);
      if (index === 0) {
        this.restaurant.thumbnail = restaurantImage.thumbnail; // for later update Restaurant
        this.restaurant.teaserImage = restaurantImage.teaserImage; // for later update Restaurant
        // Update thumbnail in restaurant
        this.appStore.dispatch(new UpdateRestaurantAction({restaurant: this.restaurant}));
      }
    });
    this.appStore.dispatch(new CreateRestaurantImagesAction({restaurantImages: this.restaurantImages}));
  }
}
