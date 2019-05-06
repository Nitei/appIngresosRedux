import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso;
  subsStoreIngresosEgresos: Subscription = new Subscription;

  constructor(
    private store: Store<AppState>,
    public IES: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.subsStoreIngresosEgresos = this.store.select('IngresoEgreso')
      .pipe(
        filter( (item: any) => item.items.length != 0) )
        .subscribe( (ingresoEgreso: any) => {
          this.items = ingresoEgreso.items;
        });
  }

  ngOnDestroy() {
    this.subsStoreIngresosEgresos.unsubscribe();
  }

  borrarItem(uid: string) {
    this.IES.borrarIngresoEgreso(uid);
  }

}
