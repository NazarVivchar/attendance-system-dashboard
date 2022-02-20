import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {WorkspaceApiService} from "../../services/workspace-api.service";
import {singInToWorkspace, singInToWorkspaceFailure, singInToWorkspaceSuccess} from "../actions/workspace.actions";
import {catchError, map, of, switchMap} from "rxjs";
import {WorkspaceModel} from "@asd/workspace/models-workspace";

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

  constructor(
    private readonly actions$: Actions,
    private readonly workspaceApiService: WorkspaceApiService,
  ) {
  }
}
