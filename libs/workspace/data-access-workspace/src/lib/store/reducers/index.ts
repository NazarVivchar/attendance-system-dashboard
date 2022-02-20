import * as fromWorkspace from './workspace.reducer'
import {createFeatureSelector} from "@ngrx/store";

export const featureKey = 'dataAccessWorkspace'

export interface WorkspaceState {
  [fromWorkspace.workspaceFeatureKey]: fromWorkspace.State,
}

export interface State {
  [featureKey]: WorkspaceState
}

export const reducers = {
  [fromWorkspace.workspaceFeatureKey]: fromWorkspace.reducer,
}

export const selectState = createFeatureSelector<WorkspaceState>(featureKey);
