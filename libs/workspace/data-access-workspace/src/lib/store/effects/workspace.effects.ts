import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {WorkspaceApiService} from "../../services/workspace-api.service";
import {singInToWorkspace, singInToWorkspaceFailure, singInToWorkspaceSuccess} from "../actions/workspace.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
import {WorkspaceModel} from "@asd/workspace/models-workspace";
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: "root"
})
export class WorkspaceEffects {
  private signInToWorkspace$ = createEffect(() => this.actions$.pipe(
    ofType(singInToWorkspace),
    switchMap(({name, password}) => this.workspaceApiService.singInToWorkspace(name, password).pipe(
      map((workspace: WorkspaceModel | null) => singInToWorkspaceSuccess({workspace})),
      catchError((error) => of(singInToWorkspaceFailure({error})))
    ))
  ));

  private showSpinner$ = createEffect(() => this.actions$.pipe(
    ofType(singInToWorkspace),
    tap(() => this.spinner.show())
  ), {dispatch: false});

  private hideSpinner$ = createEffect(() => this.actions$.pipe(
    ofType(singInToWorkspaceSuccess, singInToWorkspaceFailure),
    tap(() => this.spinner.hide())
  ), {dispatch: false});

  constructor(
    private readonly actions$: Actions,
    private readonly workspaceApiService: WorkspaceApiService,
    private readonly spinner: NgxSpinnerService
  ) {
  }
}
