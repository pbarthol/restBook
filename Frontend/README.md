# Restbook

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

D:\RestBook\Frontend\restbook\node_modules\@ngrx\effects\src\actions.d.ts
    // lift(operator: Operator<any, Action>): Observable<Action>;
    lift<R>(operator: Operator<Action, R>): Observable<R>

## Using store debugging in chrome
Redux DevTools in chrome 
npm install @ngrx/store-devtools@3.2.4 --save in project
in app.module:
...
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './reducers';
...
  imports: [
    ...
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentStore({
      maxAge: 5,
      monitor: reducer
    })
    ...
    

