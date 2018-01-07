import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import {Message} from 'primeng/primeng';

/** Store, State */
import { Store } from '@ngrx/store';
import { State } from '../../store/restaurants/reducer';
import { AppState } from '../../reducers/index';

/** Actions */
import { LoadRestaurantsAction } from '../../store/restaurants/actions';
import {
  HideRegisterAction,
  HideLoginAction,
} from '../../store/user-interface/actions';
import { LoginAction, LogoutAction } from '../../store/user/actions';

/** Models */
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

  private restaurantList$: Observable<Restaurant[]>;
  private showLogin: boolean;
  private msgs: Message[] = [];

  constructor(private store: Store<State>,
              private appStore: Store<AppState>) {
    this.restaurantList$ = this.appStore.select(state => state.restaurants.restaurants)
      .do(res => console.log("store.select: ", res));
  }

  ngOnInit() {
    this.store.dispatch(new LoadRestaurantsAction());
    this.store.dispatch(new HideRegisterAction());
    this.store.dispatch(new HideLoginAction());
    this.store.dispatch(new LogoutAction()); // User is logged out
  }

}
