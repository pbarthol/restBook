import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-restaurant-list',
  templateUrl: 'restaurant-list.component.html',
  styleUrls: ['restaurant-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RestaurantListComponent implements OnInit {
  @Input() listParams;
  @Input() restaurants$;

  constructor() { }

  ngOnInit() {
  }

}
