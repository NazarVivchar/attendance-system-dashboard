import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadEmployees, resetEmployees} from "./store/actions/employees.actions";
import {
  selectEmployeeById,
  selectEmployees,
  selectEmployeesError,
  selectEmployeesLoaded,
  selectEmployeesLoading
} from "./store/selectors/employees.selectors";
import {Observable} from "rxjs";
import {EmployeeModel} from "@asd/employees/models-employees";

@Injectable({
  providedIn: "root"
})
export class DataAccessEmployeesService {
  public employees$ = this.store.select(selectEmployees);
  public loading$ = this.store.select(selectEmployeesLoading);
  public loaded$ = this.store.select(selectEmployeesLoaded);
  public error$ = this.store.select(selectEmployeesError)

  constructor(
    private readonly store: Store,
  ) {
  }

  public loadEmployees(workspaceId: string): void {
    this.store.dispatch(loadEmployees({workspaceId}))
  }

  public resetEmployees(): void {
    this.store.dispatch(resetEmployees())
  }

  public getEmployeeById(id: string): Observable<EmployeeModel | null> {
    return this.store.select(selectEmployeeById(id));
  }
}
