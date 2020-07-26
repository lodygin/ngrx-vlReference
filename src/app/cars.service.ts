import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppState} from './redux/app.state';
import {Store} from '@ngrx/store';
import {AddCar, DeleteCar, LoadCars, UpdateCar} from './redux/cars.action';
import {Car} from './car.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  static BASE_URL: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
  }

  preloadCars(): Observable<Car[]> {
    return this.http.get<Car[]>(CarsService.BASE_URL + 'cars')
  }

  loadCars(): void {
    this.preloadCars()
      .toPromise()
      .then((cars: Car[]) => {
        this.store.dispatch(new LoadCars(cars));
      });
  }

  addCar(car: Car) {
    this.http.post(CarsService.BASE_URL + 'cars', car)
      .toPromise()
      .then((car: Car) => {
        this.store.dispatch(new AddCar(car))
      })
  }

  deleteCar(car: Car) {
    this.http.delete(CarsService.BASE_URL + 'cars/' + car.id)
      .toPromise()
      .then(() => {
        this.store.dispatch(new DeleteCar(car))
      })
  }

  updateCar(car: Car) {
    this.http.put(CarsService.BASE_URL + 'cars/' + car.id, car)
      .toPromise()
      .then((car: Car) => {
        this.store.dispatch(new UpdateCar(car))
      })
  }
}
