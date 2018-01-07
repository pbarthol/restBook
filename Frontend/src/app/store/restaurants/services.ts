/**
 * Created by Peter on 17.11.2017.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'


import { Restaurant } from './restaurant/models';

@Injectable()
export class RestaurantService {
  private readonly URL = "http://localhost:3000/api/restaurant"
  private readonly UserRestaurantURL = "http://localhost:3000/api/user/restaurant"
  constructor (private http: HttpClient) {}

  public getRestaurants(): Observable<Array<Restaurant>> {
    return this.http.get<Restaurant[]>(this.URL)
      // .map(response => response.text() ? response.json(): response)
      .map(response => response)
      .do(res => console.log('map = ', res))
  }

  public getUserRestaurants(userid: string): Observable<Array<Restaurant>>{
    let httpParam = new HttpParams()
    .set("id", userid);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.get<Restaurant[]>(this.UserRestaurantURL + '/' + userid)
      .do(res => console.log('UserRestaurants = ', res))
      .map(data => data)
}

  // getRestaurant(id): Observable<Restaurant> {
  //   return this.http.get('/api/restaurant/' + id)
  //     .map(res => res.json());
  // }
  //
  // saveRestaurant(restaurant) {
  //   if (restaurant.id === 0) {
  //     return this.http.post('/api/restaurant', restaurant)
  //       .map(res => res.json());
  //   } else {
  //     return this.http.put('/api/restaurant/' + restaurant.id, restaurant)
  //       .map(res => res.json());
  //   }
  // }
  //
  // deleteRestaurant(restaurant) {
  //   return this.http.delete('/api/restaurant/' + restaurant.id)
  //     .map(res => restaurant);
  // }
}
