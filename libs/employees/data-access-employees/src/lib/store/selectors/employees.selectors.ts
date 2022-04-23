import {createSelector} from "@ngrx/store";
import {selectState} from "../reducers";
import {employeesFeatureKey} from "../reducers/employees.reducer";

const selectEmployeesState = createSelector(selectState, (state) => state[employeesFeatureKey]);

export const selectEmployees = createSelector(selectEmployeesState, (state) => state.employees);
export const selectEmployeesLoading = createSelector(selectEmployeesState, (state) => state.loading);
export const selectEmployeesLoaded = createSelector(selectEmployeesState, (state) => state.loaded);
export const selectEmployeesError = createSelector(selectEmployeesState, (state) => state.error);
