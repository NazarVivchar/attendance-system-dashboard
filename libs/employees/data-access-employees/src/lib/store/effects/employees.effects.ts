import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {EmployeesApiService} from "../../services/employees-api.service";
import {
  loadEmployees, loadEmployeesFailure, loadEmployeesSuccess,
} from "../actions/employees.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {EmployeeModel} from "@asd/employees/models-employees";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: "root"
})
export class EmployeesEffects {
  private loadEmployees$ = createEffect(() => this.actions$.pipe(
    ofType(loadEmployees),
    switchMap(({workspaceId}) =>
      this.employeesApiService.loadWorkspaceEmployees(workspaceId).pipe(
        map((employees: EmployeeModel[] | null) => loadEmployeesSuccess({employees})),
        catchError((error) => of(loadEmployeesFailure({error}))),
      )
    )
  ));

  private showSpinner$ = createEffect(() => this.actions$.pipe(
    ofType(loadEmployees),
    tap(() => this.spinner.show())
  ), {dispatch: false});

  private hideSpinner$ = createEffect(() => this.actions$.pipe(
    ofType(loadEmployeesSuccess, loadEmployeesFailure),
    tap(() => this.spinner.hide())
  ), {dispatch: false});

  constructor(
    private readonly actions$: Actions,
    private readonly employeesApiService: EmployeesApiService,
    private readonly spinner: NgxSpinnerService
  ) {
  }
}
