import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { dashboardRoutes } from './dashboard.routes';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes,
        // canActivate: [ AuthGuardService ]
    },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
