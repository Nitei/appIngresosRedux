import * as UI from './ui.acciones';

export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
};

export function uiReducer( state = initState, action: UI.acciones ) {
    switch (action.type) {
        case UI.ACTIVAR_LOADING:
            return {
                isLoading: true
            };
        case UI.DESACTIVAR_LOADING:
            return {
                isLoading: false
            };

        default:
            return state;
    }
}
