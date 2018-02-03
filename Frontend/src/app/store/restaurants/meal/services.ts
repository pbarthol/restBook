/**
 * Created by Peter on 27.01.2018.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import { Meal } from './models';

@Injectable()
export class MealService {
  private readonly MealURL = "http://localhost:3000/api/meal"
  private readonly MealsURL = "http://localhost:3000/api/meals"

  constructor(private http: HttpClient) {
  }

  public getMeal(mealId: string): Observable<Meal> {
    let httpParam = new HttpParams()
      .set("id", mealId);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };
    return this.http.get<Meal>(this.MealsURL + '/' + mealId)
      .do(res => console.log('Get Meal = ', res))
      .map(data => data)
  }

  public getMeals(restaurantid: string): Observable<Array<Meal>> {
    let httpParam = new HttpParams()
      .set("id", restaurantid);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };
    return this.http.get<Meal[]>(this.MealsURL + '/' + restaurantid)
      .do(res => console.log('Meals = ', res))
      .map(data => data)
  }

  public addMeal(meal: Meal) {
    let body = JSON.stringify({meal});
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.MealURL, body, httpOptions)
      .map(res => res)
  }

  public updateMeal(meal: Meal) {
    let body = JSON.stringify({meal});
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(this.MealURL, body, httpOptions)
      .map(res => res);
  }
}




