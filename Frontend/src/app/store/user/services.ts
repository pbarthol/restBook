/**
 * Created by Peter on 17.11.2017.
 */
import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import { User } from './models';
import {isUndefined} from "util";

@Injectable()
export class UserService {
  private readonly UserURL = "http://localhost:3000/api/user"
  private readonly LoginURL = "http://localhost:3000/api/login"
  constructor (private http: HttpClient) {}

  public getUser(userid: string): Observable<User>{
    let httpParam = new HttpParams()
      .set("id", userid);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      // params: httpParam
    };
    return this.http.get<User>(this.UserURL + '/' + userid)
      // .map(response => response.text() ? response.json(): response)
      .do(res => console.log('User = ', res))
      .map(data => data)
  }

  public saveUser(user: User) {
    if (user._id === '0') {
      delete user._id;
    }
    let body = JSON.stringify({user});
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    if (typeof user._id === 'undefined') {
      return this.http.post(this.UserURL, body, httpOptions)
      // return this.http.post(this.UserURL, user)
        .map(res => res)
    } else {
      return this.http.put(this.UserURL, body, httpOptions)
        .map(res => res);
    }
  }
  public login(username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let body = JSON.stringify({username: username, password: password});
    // let headers = new HttpHeaders().set({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.post(this.LoginURL, body, httpOptions)
      // return this.http.post(this.LoginURL, user)
      .map(data => {
        let token = data['token'];
        let userid = data['userid'];
        return {token: token, userid: userid};
      })
  }
}
