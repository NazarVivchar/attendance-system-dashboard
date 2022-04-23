import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EmployeesApiService} from "../../services/employees-api.service";
import {
  loadEmployees, loadEmployeesFailure, loadEmployeesSuccess,
} from "../actions/employees.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {EmployeeModel} from "@asd/employees/models-employees";

@Injectable({
  providedIn: "root"
})
export class EmployeesEffects {
  private loadEmployees$ = createEffect(() => this.actions$.pipe(
    ofType(loadEmployees),
    switchMap(({workspaceId}) => this.employeesApiService.loadWorkspaceEmployees(workspaceId).pipe(
      map((employees: EmployeeModel[] | null) => loadEmployeesSuccess({employees})),
      catchError((error) => of(loadEmployeesFailure({error})))
    ))
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly employeesApiService: EmployeesApiService,
  ) {
  }
}
