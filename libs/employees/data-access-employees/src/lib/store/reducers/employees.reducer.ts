import {createReducer, on} from "@ngrx/store";
import {
  loadEmployees,
  loadEmployeesSuccess,
  loadEmployeesFailure,
  resetEmployees,
} from "../actions/employees.actions";
import {EmployeeModel} from "@asd/employees/models-employees";

export const employeesFeatureKey = 'employees';

export interface State {
  employees: EmployeeModel[] | null,
  loading: boolean,
  loaded: boolean,
  error: string | null,
}

export const initialState: State = {
  employees: null,
  loading: false,
  loaded: false,
  error: null,
}

export const reducer = createReducer(
  initialState,
  on(loadEmployees, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadEmployeesSuccess, (state, {employees}) => ({
    ...state,
    employees,
    loading: false,
    loaded: true,
  })),
  on(loadEmployeesFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false,
  })),
  on(resetEmployees, () => ({...initialState}))
)
