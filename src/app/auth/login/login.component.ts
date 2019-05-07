import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { FormGroup } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  form = {
    email: 'test@test.com',
    password: '123456'
  };

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
