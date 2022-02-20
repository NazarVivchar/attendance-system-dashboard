import {createSelector} from "@ngrx/store";
import {selectState} from "../reducers";
import {workspaceFeatureKey} from "../reducers/workspace.reducer";

const selectWorkspaceState = createSelector(selectState, (state) => state[workspaceFeatureKey]);

export const selectWorkspace = createSelector(selectWorkspaceState, (state) => state.workspace);
export const selectWorkspaceLoading = createSelector(selectWorkspaceState, (state) => state.loading);
export const selectWorkspaceError = createSelector(selectWorkspaceState, (state) => state.error);
