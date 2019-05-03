import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  cargando: boolean;

  constructor(
    private servicio: AuthService,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });
  }

  login(data) {
    this.servicio.login(data.email, data.password);
  }

}
