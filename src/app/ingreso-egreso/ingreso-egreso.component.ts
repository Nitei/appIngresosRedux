import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.acciones';
import * as IE from '../ingreso-egreso/ingreso-egreso.reducer';


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubscriptions: Subscription = new Subscription;
  cargando: boolean;

  constructor(
    public ingresoEgresoService: IngresoEgresoService,
    private store: Store<IE.AppState>
  ) { }

  ngOnInit() {
    this.store.select('ui')
      .subscribe(ui => {
        this.cargando = ui.isLoading;
      });

    this.forma = new FormGroup({
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.required)
    });
  }

  ngOnDestroy() {
    this.loadingSubscriptions.unsubscribe();
  }

  crearIngresoEgreso() {

    this.store.dispatch( new ActivarLoadingAction());

    const ingresoEgreso = new IngresoEgreso({ ...this.forma.value, tipo: this.tipo});
    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
      .then(data => {
        this.store.dispatch( new DesactivarLoadingAction());
        Swal.fire('Creado ', ingresoEgreso.descripcion, 'success');
        this.forma.reset({monto: 0});
      })
      .catch(error => {
        this.store.dispatch( new DesactivarLoadingAction());
        console.error(error);
      });

  }

}
