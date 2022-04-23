import * as fromEmployees from './employees.reducer'
import {createFeatureSelector} from "@ngrx/store";

export const featureKey = 'dataAccessEmployees'

export interface EmployeesState {
  [fromEmployees.employeesFeatureKey]: fromEmployees.State,
}

export interface State {
  [featureKey]: EmployeesState
}

export const reducers = {
  [fromEmployees.employeesFeatureKey]: fromEmployees.reducer,
}

export const selectState = createFeatureSelector<EmployeesState>(featureKey);
