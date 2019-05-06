import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  IngresoEgresoListenerSubscription: Subscription = new Subscription();
  IngresoEgresoItemsListenerSubscription: Subscription = new Subscription();

  constructor(private afDb: AngularFirestore, private authService: AuthService, private store: Store<AppState>) {}

  initIngresoEgresoLitener() {
    this.IngresoEgresoItemsListenerSubscription = this.store
      .select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.IngresoEgresoItems(auth.user.uid);
      });
  }

  private IngresoEgresoItems(uid: string) {
    this.IngresoEgresoItemsListenerSubscription = this.afDb
      .collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              ...doc.payload.doc.data(),
              uid: doc.payload.doc.id,
            };
          });
        })
      )
      .subscribe((data: any[]) => {
        this.store.dispatch(new SetItemsAction(data));
      });
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.authService.getUsuario();

    return this.afDb.doc(`${user.uid}/ingresos-egresos/items/${uid}`).delete();
  }

  cancelarSubscriptions() {
    this.IngresoEgresoItemsListenerSubscription.unsubscribe();
    this.IngresoEgresoListenerSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUsuario();

    return this.afDb
      .doc(`${user.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }
}
