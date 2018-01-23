import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../../store/restaurants/restaurant/models';

@Component({
  selector: 'app-restaurant-teaser',
  templateUrl: 'restaurant-teaser.component.html',
  styleUrls: ['restaurant-teaser.component.css']
})
export class RestaurantTeaserComponent implements OnInit {

  @Input() restaurant: Restaurant;

  constructor() { }

  ngOnInit() {
  }

}
