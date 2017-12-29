/**
 * Created by Peter on 17.11.2017.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import { User } from './models';

@Injectable()
export class UserService {
  private readonly URL = "http://localhost:3000/api/user"
  constructor (private http: Http) {}

  public getUser(userid: string): Observable<User> {
    return this.http.get(this.URL + '/' + userid)
      // .map(response => response.text() ? response.json(): response)
      .do(res => console.log('User = ', res))
      .map(response => response.json() || User)
  }

  public saveUser(user: User) {
    if (user._id === '0') {
      delete user._id;
    }
    let body = JSON.stringify({user});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    if (user._id === '0') {
      return this.http.post(this.URL, body, options)
      // return this.http.post(this.URL, user)
        .map(res => res.json())
    } else {
      return this.http.put(this.URL, body, options)
        .map(res => res.json());
    }
  }

  public login(username: String, password: String) {
    let body = JSON.stringify({username: username, password: password});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.URL + '/login', body, options)
      // return this.http.post(this.URL, user)
      .map(res => {
        let token = res.json() && res.json().token;
        let userid = res.json().userid;
        return {token: token, userid: userid};
      })
  }
  //
  // deleteRestaurant(restaurant) {
  //   return this.http.delete('/api/restaurant/' + restaurant.id)
  //     .map(res => restaurant);
  // }
}
