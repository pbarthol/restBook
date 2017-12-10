/**
 * Created by Peter on 10.12.2017.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { Restaurant } from '../../store/restaurants/restaurant/models';

@Pipe({
  name: 'restaurantFilter'
})

export class RestaurantPipe implements PipeTransform {
  transform(items: Restaurant[], args: any): any {
    let filterStrings: any[];
    filterStrings = args.split("#");
    let filterType = (filterStrings[0] == 'all') ? '' : filterStrings[0];
    let filterDistance: number = filterStrings[1];

    if (filterType == '') {
      // all
      // return items.filter( item => (item.distance <= filterDistance) );
      return items.filter( item => item );
    }
    else {
      // return items.filter( item => (item.category == filterType) && (item.distance <= filterDistance) );
      return items.filter( item => (item.category == filterType) );
    }

  }
}
