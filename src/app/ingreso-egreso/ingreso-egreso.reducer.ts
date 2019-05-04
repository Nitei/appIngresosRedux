import * as IE from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

const estadoInicial: IngresoEgresoState = {
    items: []
};

export function IngresoEgresoReducer(state = estadoInicial, action: IE.acciones): IngresoEgresoState {

    switch (action.type) {
        case IE.SET_ITEMS:
            return {
                items: [
                    ...action.items.map( item => {
                        return {
                            ...item
                        };
                    })
                ]
            };
        
        case IE.UNSET_ITEMS:
            return {
                items: []
            };

        default:
            return state;
    }
}
