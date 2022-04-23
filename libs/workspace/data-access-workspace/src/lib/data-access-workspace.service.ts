import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  selectWorkspace,
  selectWorkspaceError,
  selectWorkspaceLoaded,
  selectWorkspaceLoading
} from "./store/selectors/workspace.selectors";
import {
  resetWorkspace,
  setWorkspace,
  singInToWorkspace,
  singInToWorkspaceSuccess
} from "./store/actions/workspace.actions";
import {WorkspaceModel} from "@asd/workspace/models-workspace";
import {Actions, ofType} from "@ngrx/effects";
import {mapTo} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DataAccessWorkspaceService {
  public readonly workspace$ = this.store.select(selectWorkspace);
  public readonly loading$ = this.store.select(selectWorkspaceLoading);
  public readonly loaded$ = this.store.select(selectWorkspaceLoaded);
  public readonly error$ = this.store.select(selectWorkspaceError)

  public readonly singInToWorkspaceSuccess$ = this.actions$.pipe(ofType(singInToWorkspaceSuccess), mapTo(true));

  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
  ) {
  }

  public setWorkspace(workspace: WorkspaceModel): void {
    this.store.dispatch(setWorkspace( { workspace }))
  }

  public singInToWorkspace(name: string, password: string): void {
    this.store.dispatch(singInToWorkspace({name, password}))
  }

  public resetWorkspace(): void {
    this.store.dispatch(resetWorkspace())
  }
}
