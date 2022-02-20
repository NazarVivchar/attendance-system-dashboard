import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectWorkspace, selectWorkspaceError, selectWorkspaceLoading} from "./store/selectors/workspace.selectors";
import {singInToWorkspace} from "./store/actions/workspace.actions";

@Injectable({
  providedIn: "root"
})export class DataAccessWorkspaceService {
  public workspace$ = this.store.select(selectWorkspace);
  public loading$ = this.store.select(selectWorkspaceLoading);
  public error$ = this.store.select(selectWorkspaceError)

  constructor(private readonly store: Store) {
  }

  public singInToWorkspace(name: string, password: string): void {
    this.store.dispatch(singInToWorkspace({name, password}))
  }
}
