import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
/** PrimeNG Modules */
import { AutoCompleteModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';

/** Own Components */
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantEditComponent } from './components/restaurant-edit/restaurant-edit.component';
import { UserComponent } from './components/user/user.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RestaurantEffects } from './store/restaurants/effects';
import { reducers } from './reducers/index';
import { RestaurantService } from './store/restaurants/services';
import { RestaurantTeaserComponent } from './components/restaurant-teaser/restaurant-teaser.component';

/** Pipes */
import { RestaurantPipe } from './components/pipes/restaurant';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RestaurantListComponent,
    RestaurantComponent,
    RestaurantEditComponent,
    UserComponent,
    UserEditComponent,
    HeaderComponent,
    FooterComponent,
    RestaurantTeaserComponent,
    RestaurantPipe,
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([
      RestaurantEffects,
    ]),
    AutoCompleteModule,
    PanelModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
 ],
  providers: [
    RestaurantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
