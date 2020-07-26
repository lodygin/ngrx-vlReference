import {Component, OnInit} from '@angular/core';
import {Car} from '../car.model';
import * as moment from 'moment';
import {AppState} from '../redux/app.state';
import {Store} from '@ngrx/store';
import {AddCar} from '../redux/cars.action';
import {CarsService} from '../cars.service';

@Component({
  selector: 'app-cars-form',
  templateUrl: './cars-form.component.html',
  styleUrls: ['./cars-form.component.scss']
})
export class CarsFormComponent implements OnInit {

  carName = '';
  carModel = '';

  constructor(
    private carsService: CarsService
  ) {
  }

  ngOnInit(): void {
  }

  onAdd(): void {
    if (this.carModel === '' || this.carName === '') return;

    const date = moment().format('DD.MM.YY');
    const car = new Car(this.carName, date, this.carModel);

    // this.store.dispatch(new AddCar(car));
    this.carsService.addCar(car);

    this.carModel = '';
    this.carName = '';
  }

  onLoad(): void {
    this.carsService.loadCars();
  }
}
