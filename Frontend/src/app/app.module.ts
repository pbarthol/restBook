import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/** Own Components */
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantEditComponent } from './restaurant-edit/restaurant-edit.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AutoCompleteModule } from 'primeng/primeng';
import { EffectsModule } from "@ngrx/effects";
import { RestaurantEffects } from './store/restaurants/effects';
import { StoreModule } from "@ngrx/store";
import { reducer } from './reducers';
import { RestaurantService } from './store/restaurants/services';

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
    FooterComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    EffectsModule.run(RestaurantEffects),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
    AutoCompleteModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentStore({
      maxAge: 5,
      monitor: reducer
    })
 ],
  providers: [
    RestaurantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
