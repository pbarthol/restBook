import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith, map } from 'rxjs/operators';
import 'rxjs/add/operator/toArray';
import 'rxjs/observable/from';
import { Store } from '@ngrx/store';
import { RestaurantListState, getRestaurants } from '../store/restaurants/reducer';
import { LoadRestaurantsAction } from '../store/restaurants/actions';
import { Restaurant } from '../store/restaurants/restaurant/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {

  myControl: FormControl = new FormControl();
  options = [
    'Basel',
    'Bern',
    'Zürich',
    'Tiefenbrunnen',
    'Stadelhofen',
    'Wollishofen'
  ];

  filteredOptions: Observable<string[]>;

  public restaurants: Observable<any>;
  // public restaurants:Array<Restaurant>;


  constructor(private store: Store<RestaurantListState>) {
    this.restaurants = store.select(getRestaurants);
    this.store.dispatch(new LoadRestaurantsAction());
    var i = 0; // just for debugging
  }

  ngOnInit() {

    //   this.filteredOptions = this.myControl.valueChanges
    //     .startWith('')
    //     .map(val => this.filter(val));
    // }
    //
    // filter(val: string): string[] {
    //   return this.options.filter(option =>
    //   option.toLowerCase().indexOf(val.toLowerCase()) === 0);
    // }
  }
}
