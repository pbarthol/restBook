/**
 * Created by Peter on 17.11.2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import { User } from './models';

@Injectable()
export class UserService {
  private readonly URL = "http://localhost:3000/api/user"
  constructor (private http: Http) {}

  public getUser(): Observable<User> {
    return this.http.get(this.URL)
      // .map(response => response.text() ? response.json(): response)
      .map(response => response.json() || User)
      .do(res => console.log('map = ', res))
  }

  public saveUser(user) {
    if (user.id === 0) {
      return this.http.post('/api/user', user)
        .map(res => res.json());
    } else {
      return this.http.put('/api/user/' + user.id, user)
        .map(res => res.json());
    }
  }
  //
  // deleteRestaurant(restaurant) {
  //   return this.http.delete('/api/restaurant/' + restaurant.id)
  //     .map(res => restaurant);
  // }
}
