import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { subscribeOn } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [],
})
export class EstadisticaComponent implements OnInit {
  ingresos: number;
  egresos: number;
  cuantosIngresos: number;
  cuantosEgresos: number;

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [0, 0];
  public doughnutChartType = 'doughnut';

  Subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.Subscription = this.store.select('IngresoEgreso').subscribe((ingresoEgreso: any) => {
      this.contarIngresoEgresos(ingresoEgreso.items);
    });
  }

  contarIngresoEgresos(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;
    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;

    items.forEach(element => {
      if (element.tipo === 'ingreso') {
        this.cuantosIngresos++;
        this.ingresos += element.monto;
      } else {
        this.cuantosEgresos++;
        this.egresos += element.monto;
      }
    });
    this.doughnutChartData = [this.ingresos, this.egresos];
  }
}
