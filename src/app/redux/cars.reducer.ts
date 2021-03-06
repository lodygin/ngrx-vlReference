import {Car} from '../car.model';
import {CAR_ACTION, CarsAction} from './cars.action';

const initialState = {
  cars: []
};

export function carsReducer(state = initialState, action: CarsAction): any {
  switch (action.type) {
    case CAR_ACTION.ADD_CAR:
      return {
        ...state,
        cars: [...state.cars, action.payload]
      };
    case CAR_ACTION.DELETE_CAR:
      return {
        ...state,
        cars: [
          ...state.cars.filter(c => c.id !== action.payload.id)
        ]
      };
    case CAR_ACTION.UPDATE_CAR:
      const idx = state.cars.findIndex(c => c.id === action.payload.id)
      state.cars[idx] = action.payload
      return {
        ...state,
        cars: [...state.cars]
      }
    case CAR_ACTION.LOAD_CARS:
      return {
        ...state,
        cars: [
          ...action.payload
        ]
      }
    default:
      return state
  }
}
