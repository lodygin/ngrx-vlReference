import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CarsFormComponent} from './cars-form/cars-form.component';
import {CarComponent} from './car/car.component';
import {carsReducer} from './redux/cars.reducer';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {CarsEffect} from './redux/cars.effect';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CarsFormComponent,
    CarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({carPage: carsReducer}, {
      runtimeChecks: {
        strictActionImmutability: false,
        strictStateImmutability: false
      }
    }),
    EffectsModule.forRoot([CarsEffect]),
    environment.production ? [] : StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
