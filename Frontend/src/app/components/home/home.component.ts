import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/flatMap';
import { Store } from '@ngrx/store';
import { State, getRestaurants } from '../../store/restaurants/reducer';
import { LoadRestaurantsAction } from '../../store/restaurants/actions';
import { Restaurant } from '../../store/restaurants/restaurant/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  public listParamMeat = {
    "id": 1,
    "title": 'Fleisch',
    "icon": 'fa fa-check',
    "image": "../images/unterkuenfte.jpg",
    "filter": false,
    "category": 'Meat'
  };
  public listParamVegetarian = {
    "id": 2,
    "title": 'Vegetarisch',
    "icon": 'fa fa-pied-piper',
    "image": "../img/bueros.jpg",
    "filter": false,
    "category": 'Vegetarian'
  };
  public listParamVegan = {
    "id": 3,
    "title": 'Vegan',
    "icon": 'fa fa-car',
    "image": "../img/partyraeume.jpg",
    "filter": false,
    "category": 'Vegan'
  };


  myControl: FormControl = new FormControl();
  options = [
    'Basel',
    'Bern',
    'Zürich',
    'Tiefenbrunnen',
    'Stadelhofen',
    'Wollishofen'
  ];

  filteredOptions: Observable<Array<Restaurant>>;

  // public restaurants: Observable<Array<Restaurant>>;
  // private restaurantList$: Observable<Restaurant[]>;
  private stringList$: Observable<string[]>;
  private restaurantList$: Observable<Restaurant[]>;
  public restaurantsMeat$: Observable<Array<Restaurant>>;

  constructor(private store: Store<State>) {
    this.restaurantList$ = this.store.select(getRestaurants)
      .do(res => console.log("store.select: ", res));
    // this.stringList$ = Observable.of(['1', '2', '3'])
    // this.restaurantsMeat$ = this.restaurantList$
    // filter(restaurant => restaurant.category === 'Meat')
    this.restaurantsMeat$ = this.store.select(getRestaurants)
      .map(restaurant => restaurant.filter(restaurant => restaurant.category === "Meat"))

      // .map((restaurants) => restaurants)
      // .map((restaurant) => restaurant.category)
      // .filter((category) => (category === "Meat"))


      // .map(restaurants => restaurants)
      // .filter((restaurant: Restaurant) => restaurant.category === 'Meat')
      .do(res => console.log("After tow maps: ", res));
      // .filter((restaurant: Restaurant) => restaurant.category === 'Meat');
    var i = 0; // just for debugging
  }

  ngOnInit() {
    this.store.dispatch(new LoadRestaurantsAction());
  }

}
