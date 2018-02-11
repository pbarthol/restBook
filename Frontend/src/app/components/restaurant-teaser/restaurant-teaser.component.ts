import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../../store/restaurants/restaurant/models';
import { AppState } from '../../reducers/index';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
// import {
//   SetRestaurantForDetailAction
// } from '../../store/restaurants/actions';
// import {
//   ShowRestaurantDetailAction
// } from '../../store/user-interface/actions';

@Component({
  selector: 'app-restaurant-teaser',
  templateUrl: 'restaurant-teaser.component.html',
  styleUrls: ['restaurant-teaser.component.css']
})
export class RestaurantTeaserComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor(private appStore: Store<AppState>, private router: Router) { }

  ngOnInit() {
  }

  // displayRestaurant(restaurantId: string) {
  //   this.appStore.dispatch(new SetRestaurantForDetailAction(restaurantId));
  //   this.appStore.dispatch(new ShowRestaurantDetailAction());
  //   this.router.navigate(['/restaurantdetail']);
  // }

}
