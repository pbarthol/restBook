import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { AppState } from '../../reducers/index';
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
/** Store */
import { Restaurant, RestaurantImage } from '../../store/restaurants/restaurant/models';
import { Openinghour, OpeninghourDetail } from '../../store/restaurants/openinghours/models';
import {
  LoadRestaurantAction
} from '../../store/restaurants/actions';
import {
  LoadOpeninghoursAction
} from '../../store/restaurants/openinghours/actions';
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
  private openinghours$: Observable<Openinghour[]>;
  private restaurant: Restaurant;
  private images$: Observable<any[]>;
  private images: any[];
  private openinghours: OpeninghourDetail[];
  private oneOpeninghour: OpeninghourDetail;
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
    this.openinghours$ = this.appStore.select(state => state.openinghours.openinghours);
    this.images$ = Observable.of(this.images);
  }

  ngOnInit() {
    this.appStore.dispatch(new LoadRestaurantAction({restaurantId: this.restaurantId}));
    this.appStore.dispatch(new LoadOpeninghoursAction({restaurantId: this.restaurantId}));
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
    this.openinghours$.subscribe(openinghours => {
      this.openinghours = [];
      openinghours.map(openinghour => {
        this.oneOpeninghour = new OpeninghourDetail();
        this.oneOpeninghour.weekday = openinghour.weekday;
        if (openinghour.allDayClosed) {
          this.oneOpeninghour.fromTimeMorning = 'Closed';
          this.oneOpeninghour.toTimeMorning = '';
          this.oneOpeninghour.fromTimeAfternoon = '';
          this.oneOpeninghour.toTimeAfternoon = '';
        } else {
          this.oneOpeninghour.fromTimeMorning = new Date(openinghour.fromTimeMorning).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
          this.oneOpeninghour.toTimeMorning = new Date(openinghour.toTimeMorning).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
          this.oneOpeninghour.fromTimeAfternoon = new Date(openinghour.fromTimeAfternoon).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
          this.oneOpeninghour.toTimeAfternoon = new Date(openinghour.toTimeAfternoon).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
        }
        this.openinghours.push(this.oneOpeninghour);
      })
    })
  }

  // hideRestaurantDetail() {
  //   this.appStore.dispatch(new HideRestaurantDetailAction());
  // }
}
