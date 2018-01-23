import { Component, OnInit } from '@angular/core';
import { AppState } from '../../reducers/index';
import {Observable} from "rxjs";
import { Store } from '@ngrx/store';
import { Restaurant } from '../../store/restaurants/restaurant/models';
import { User } from '../../store/user/models';
import {
  LOAD_USER_RESTAURANTS,
  SET_RESTAURANT_FOR_EDIT,
  LoadUserRestaurantsAction,
  SetRestaurantForEditAction,
  SetRestaurantForDetailAction
} from '../../store/restaurants/actions';
import {
  ShowRestaurantDetailAction,
  ShowRestaurantEditAction,
  HideRestaurantOverviewAction
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

  constructor(private appStore: Store<AppState>) {
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

  displayRestaurant(id: string) {
    this.appStore.dispatch(new SetRestaurantForDetailAction(id));
    this.appStore.dispatch(new HideRestaurantOverviewAction());
    this.appStore.dispatch(new ShowRestaurantDetailAction());
  }

  addRestaurant() {
    this.appStore.dispatch(new SetRestaurantForEditAction({_id: null}));
    this.appStore.dispatch(new HideRestaurantOverviewAction());
    this.appStore.dispatch(new ShowRestaurantDetailAction());
  }

  editRestaurant(id: string) {
    this.appStore.dispatch(new SetRestaurantForEditAction({_id: id}));
    this.appStore.dispatch(new HideRestaurantOverviewAction());
    this.appStore.dispatch(new ShowRestaurantEditAction());
  }

  hideRestaurantOverview() {
    this.appStore.dispatch(new HideRestaurantOverviewAction());
  }
}
