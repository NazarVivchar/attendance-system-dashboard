import {Action, ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {}

export const appReducer: ActionReducerMap<AppState> = {};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState | undefined, action: Action): AppState => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('Previous', state)
    console.log('Action', action)
    console.log('Next', result)
    console.groupEnd();

    return result;
  }
}

export const metaReducers: MetaReducer<AppState>[] = [logger]
