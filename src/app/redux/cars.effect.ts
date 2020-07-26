import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AddCar, CAR_ACTION} from './cars.action';
import {mergeMap, switchMap} from 'rxjs/operators';
import {Car} from '../car.model';
import {CarsService} from '../cars.service';

@Injectable()
export class CarsEffect {

  constructor(
    private actions$: Actions,
    private carsService: CarsService
  ) {
  }

  @Effect() loadCars = this.actions$
    .pipe(
      ofType(CAR_ACTION.ADD_CAR),
      switchMap((action: AddCar) => {
        return this.carsService.preloadCars();
      }),
      mergeMap((cars: Car[]) => {
        return [
          {
            type: CAR_ACTION.LOAD_CARS,
            payload: cars
          }
        ];
      })
    );

}
