import {Component, Input} from '@angular/core';
import {Car} from '../car.model';
import {CarsService} from '../cars.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {

  @Input('car') car: Car;

  constructor(
    private carsService: CarsService
  ) {
  }

  onDelete(): void {
    this.carsService.deleteCar(this.car);
  }

  onBuy(): void {
    this.car.isSold = true;
    this.carsService.updateCar(this.car);
  }
}
