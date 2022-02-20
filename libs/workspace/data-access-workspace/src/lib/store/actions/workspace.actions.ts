import {createAction, props} from "@ngrx/store";
import {WorkspaceModel} from "@asd/workspace/models-workspace";

export const singInToWorkspace = createAction('[Data Access | Workspace] Sing In To Workspace', props<{ name: string, password: string }>())

export const singInToWorkspaceSuccess = createAction('[Data Access | Workspace] Sing In To Workspace Success', props<{ workspace: WorkspaceModel | null }>())

export const singInToWorkspaceFailure = createAction('[Data Access | Workspace] Sing In To Workspace Failure', props<{ error: string }>())
