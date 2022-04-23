import {WorkspaceModel} from "@asd/workspace/models-workspace";
import {createReducer, on} from "@ngrx/store";
import {
  resetWorkspace, setWorkspace,
  singInToWorkspace,
  singInToWorkspaceFailure,
  singInToWorkspaceSuccess
} from "../actions/workspace.actions";

export const workspaceFeatureKey = 'workspace';

export interface State {
  workspace: WorkspaceModel | null,
  loading: boolean,
  loaded: boolean,
  error: string | null,
}

export const initialState: State = {
  workspace: null,
  loading: false,
  loaded: false,
  error: null,
}

export const reducer = createReducer(
  initialState,
  on(setWorkspace, (state, {workspace}) => ({
    ...state,
    workspace,
    loaded: true,
    error: null,
  })),
  on(singInToWorkspace, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(singInToWorkspaceSuccess, (state, {workspace}) => ({
    ...state,
    workspace,
    loading: false,
    loaded: true,
  })),
  on(singInToWorkspaceFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false,
  })),
  on(resetWorkspace, () => ({...initialState}))
)
