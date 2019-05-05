import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {


  constructor(
    private afDb: AngularFirestore,
    private authService: AuthService,
    private store: Store<AppState>
    ) { }

  initIngresoEgresoLitener() {
    const user = this.authService.getUsuario();
    this.store.select('auth')
    .pipe(
      filter(auth => auth.user != null)
    )
    .subscribe( auth => {
      this.IngresoEgresoItems(auth.user.uid);
    });
  }

  private IngresoEgresoItems(uid: string) {
    this.afDb.collection(`${uid}/ingresos-egresos/items`)
      .valueChanges()
      .subscribe(data => console.log(data));
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUsuario();

    return this.afDb.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});
  }
}
