import * as UI from './shared/ui.reducer';
import * as Auth from './auth/auth.reducer';

import { ActionReducerMap } from '@ngrx/store';

export const appReducers: ActionReducerMap<AppState> = {
    ui: UI.uiReducer,
    auth: Auth.authReducer
};

export interface AppState {
    ui: UI.State;
    auth: Auth.AuthState;
}
