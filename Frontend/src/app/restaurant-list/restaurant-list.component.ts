import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { RestaurantListState, getRestaurants } from "../store/restaurants/reducer";
import { Restaurant } from "../store/restaurants/restaurant/models";
import { LOAD_RESTAURANTS } from "../store/restaurants/actions";


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RestaurantListComponent implements OnInit {

  public restaurants: Observable<Array<Restaurant>>;

  constructor(
    private store: Store<RestaurantListState>
  ) { }

  ngOnInit() {
    this.restaurants = this.store.select(getRestaurants);
  }

}
