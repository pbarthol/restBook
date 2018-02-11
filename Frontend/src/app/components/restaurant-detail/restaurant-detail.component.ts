import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Restaurant, RestaurantImage } from '../../store/restaurants/restaurant/models';
import { AppState } from '../../reducers/index';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import {
  LoadRestaurantAction
} from '../../store/restaurants/actions';
// import {HideRestaurantDetailAction} from "../../store/user-interface/actions";

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: 'restaurant-detail.component.html',
  styleUrls: ['restaurant-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RestaurantDetailComponent implements OnInit {

  @Input() restaurantId;
  @Input() mode;
  private detailRestaurant$: Observable<Restaurant>;
  private restaurantImages$: Observable<RestaurantImage[]>;
  private restaurant: Restaurant;
  private images: any[];
  private images$: Observable<any[]>;
  private sub: any;

  constructor(private appStore: Store<AppState>,
              private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        this.restaurantId = params['id'];
        this.mode = params['mode'];
      }
    });
    this.detailRestaurant$ = this.appStore.select(state => state.restaurants.detailRestaurant);
    this.restaurantImages$ = this.appStore.select(state => state.restaurants.restaurantImages);
    this.images$ = Observable.of(this.images);
  }

  ngOnInit() {
    this.appStore.dispatch(new LoadRestaurantAction({restaurantId: this.restaurantId}));
    this.detailRestaurant$.subscribe(restaurant => this.restaurant = restaurant);
    this.restaurantImages$.subscribe(images => {
      this.images = [];
      images.forEach(image => {
        this.images.push({
          source:'http://localhost:3000/images/restaurant/' + image.image,
          thumbnail: 'http://localhost:3000/images/restaurant/' + image.image.replace('resized', 'thumbnail'),
          title: this.restaurant.name + image.sortorder.toString()
        });
      })
    })
  }

  // hideRestaurantDetail() {
  //   this.appStore.dispatch(new HideRestaurantDetailAction());
  // }
}
