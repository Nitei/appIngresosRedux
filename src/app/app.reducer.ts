import * as UI from './shared/ui.reducer';
import * as Auth from './auth/auth.reducer';
import * as IE from './ingreso-egreso/ingreso-egreso.reducer';

import { ActionReducerMap } from '@ngrx/store';
import { IngresoEgresoState } from './ingreso-egreso/ingreso-egreso.reducer';

export const appReducers: ActionReducerMap<AppState> = {
    ui: UI.uiReducer,
    auth: Auth.authReducer,
    IngresoEgreso: IE.IngresoEgresoReducer
};

export interface AppState {
    ui: UI.State;
    auth: Auth.AuthState;
    IngresoEgreso: IE.IngresoEgresoState;
}
