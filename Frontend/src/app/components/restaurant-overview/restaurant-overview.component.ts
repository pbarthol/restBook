import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '../../reducers/index';
import {Observable} from "rxjs";
import { Store } from '@ngrx/store';
import { Restaurant } from '../../store/restaurants/restaurant/models';
import { User } from '../../store/user/models';
import {
  LOAD_USER_RESTAURANTS,
  LoadUserRestaurantsAction
} from '../../store/restaurants/actions';

@Component({
  selector: 'app-restaurant-overview',
  templateUrl: './restaurant-overview.component.html',
  styleUrls: ['./restaurant-overview.component.css']
})
export class RestaurantOverviewComponent implements OnInit {

  restaurants$: Observable<Array<Restaurant>>;
  restaurants: Restaurant[];
  loggedInUser$: Observable<User>;
  loggedInUser: User;

  constructor(private appStore: Store<AppState>) {
    this.loggedInUser$ = appStore.select(state => state.user.user);
    this.restaurants$ = appStore.select(state => state.restaurants.userRestaurants);
  }

  ngOnInit() {
    this.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
    })
    this.appStore.dispatch(new LoadUserRestaurantsAction({ userid: this.loggedInUser._id }) );
    this.restaurants$.subscribe(restaurants => {
      this.restaurants = restaurants;
    })
  }

}
