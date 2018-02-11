import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../reducers/index';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { Restaurant } from '../../store/restaurants/restaurant/models';
import { User } from '../../store/user/models';
import {
  LOAD_USER_RESTAURANTS,
  SET_USER_RESTAURANT_FOR_EDIT,
  LoadUserRestaurantsAction,
  SetUserRestaurantForEditAction,
  SetRestaurantForDetailAction
} from '../../store/restaurants/actions';
import {
  // ShowRestaurantDetailAction,
  ShowRestaurantEditAction,
  HideRestaurantOverviewAction,
  ShowMealOverviewAction, HideRestaurantEditAction
} from '../../store/user-interface/actions'

@Component({
  selector: 'app-restaurant-overview',
  templateUrl: './restaurant-overview.component.html',
  styleUrls: ['./restaurant-overview.component.css']
})
export class RestaurantOverviewComponent implements OnInit {

  private restaurants$: Observable<Array<Restaurant>>;
  private restaurants: Restaurant[];
  private loggedInUser$: Observable<User>;
  private loggedInUser: User;
  private detailRestaurantId: string;

  constructor(private appStore: Store<AppState>, private router: Router) {
    this.loggedInUser$ = appStore.select(state => state.user.user);
    this.restaurants$ = appStore.select(state => state.restaurants.userRestaurants);
  }

  ngOnInit() {
    this.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
    })
    this.appStore.dispatch(new LoadUserRestaurantsAction({ userid: this.loggedInUser._id }));
    this.restaurants$.subscribe(restaurants => {
      this.restaurants = restaurants;
    })
  }

  displayRestaurant(restaurantId: string) {
    this.router.navigate(['/restaurantdetail', restaurantId, 'detail']);
    // this.appStore.dispatch(new SetRestaurantForDetailAction(restaurantId));
    // this.appStore.dispatch(new HideRestaurantOverviewAction());
    // this.appStore.dispatch(new ShowRestaurantDetailAction());
  }

  addRestaurant() {
    this.appStore.dispatch(new SetUserRestaurantForEditAction({_id: null}));
    this.appStore.dispatch(new HideRestaurantOverviewAction());
    this.appStore.dispatch(new ShowRestaurantEditAction());
  }

  editRestaurant(restaurantId: string) {
    this.appStore.dispatch(new SetUserRestaurantForEditAction({_id: restaurantId}));
    this.appStore.dispatch(new HideRestaurantOverviewAction());
    this.appStore.dispatch(new ShowRestaurantEditAction());
  }

  hideRestaurantOverview() {
    this.appStore.dispatch(new HideRestaurantOverviewAction());
  }

  displayMealOverview(restaurantId: string) {
    this.appStore.dispatch(new HideRestaurantEditAction());
    this.appStore.dispatch(new SetRestaurantForDetailAction(restaurantId));
    this.appStore.dispatch(new HideRestaurantOverviewAction());
    this.appStore.dispatch(new ShowMealOverviewAction());
  }
}
