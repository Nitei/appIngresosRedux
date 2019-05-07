import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  nombre: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const coneguirNombre = this.store
      .select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.nombre = auth.user.nombre;
        coneguirNombre.unsubscribe();
      });
  }

  logout() {
    this.logout();
  }
}
