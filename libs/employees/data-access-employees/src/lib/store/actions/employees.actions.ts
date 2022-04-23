import {createAction, props} from "@ngrx/store";
import {EmployeeModel} from "@asd/employees/models-employees";

export const loadEmployees = createAction('[Data Access | Employees] Load Employees', props<{ workspaceId: string }>())

export const loadEmployeesSuccess = createAction('[Data Access | Employees] Load Employees Success', props<{ employees: EmployeeModel[] | null }>())

export const loadEmployeesFailure = createAction('[Data Access | Employees] Load Employees Failure', props<{ error: string }>())

export const resetEmployees = createAction('[Data Access | Employees] Reset Employees');
