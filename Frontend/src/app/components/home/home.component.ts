import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';

/** Store */
import { Store } from '@ngrx/store';
import { State, getRestaurants } from '../../store/restaurants/reducer';
import { LoadRestaurantsAction } from '../../store/restaurants/actions';
import { UIState, getRegisterVisible } from '../../store/user-interface/reducer';
import { AppState } from '../../reducers/index';
import { ShowRegisterAction, HideRegisterAction } from '../../store/user-interface/actions';
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
    "icon": 'fa fa-cutlery',
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
    "icon": 'fa fa-envira',
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

  private stringList$: Observable<string[]>;
  private restaurantList$: Observable<Restaurant[]>;
  public registerIsVisible$: Observable<any>;

  constructor(private store: Store<State>,
              private appStore: Store<AppState>) {
    this.restaurantList$ = this.store.select(getRestaurants)
      .do(res => console.log("store.select: ", res));
    // this.registerIsVisible$ = this.uiStore.select(getRegisterVisible)
    //   .do(res => console.log("store.userinterface.registerVisible: ", res));

    this.registerIsVisible$ = this.appStore.select(state => state.userinterface.registerVisible)
    // this.registerIsVisible$ = Observable.of(true)
    .do(res => console.log("store.userinterface.registerVisible: ", res));
  }

  ngOnInit() {
    this.store.dispatch(new LoadRestaurantsAction());
    this.store.dispatch(new HideRegisterAction()); // set registerIsVisible false
  }

}
