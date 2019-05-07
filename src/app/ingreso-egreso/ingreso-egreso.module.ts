import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { dashboardRoutes } from '../dashboard/dashboard.routes';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    ChartsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe
  ]
})
export class IngresoEgresoModule { }
