import * as UI from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';

export const appReducers: ActionReducerMap<AppState> = {
    ui: UI.uiReducer
};

export interface AppState {
    ui: UI.State;
}
