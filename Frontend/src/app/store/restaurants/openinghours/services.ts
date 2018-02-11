/**
 * Created by Peter on 10.02.2018.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import { Openinghour } from './models';

@Injectable()
export class OpeninghourService {
  private readonly OpeninghourURL = "http://localhost:3000/api/openinghour"

  constructor(private http: HttpClient) {
  }

  public getOpeninghours(restaurantid: string): Observable<Array<Openinghour>> {
    let httpParam = new HttpParams()
      .set("id", restaurantid);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };
    return this.http.get<Openinghour[]>(this.OpeninghourURL + '/' + restaurantid)
      .do(res => console.log('Openinghours = ', res))
      .map(data => data)
  }

  public addOpeninghours(openinghours: Openinghour[]) {
    let body = JSON.stringify({openinghours});
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(this.OpeninghourURL, body, httpOptions)
      .map(res => res)
  }

  public removeOpeninghours(restaurantId: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.delete(this.OpeninghourURL + '/' + restaurantId, httpOptions)
      .map(res => res)
  }
}
