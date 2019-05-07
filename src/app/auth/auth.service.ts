import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as UI from '../shared/ui.acciones';
import * as firebase from 'firebase';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usuario: User;
  private userSubs: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDb: AngularFirestore,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (fbUser) {
        this.userSubs = this.afDb
          .doc(`${fbUser.uid}/usuario`)
          .valueChanges()
          .subscribe((usuario: any) => {
            const newUser = new User(usuario);
            this.store.dispatch(new SetUserAction(newUser));
            this.usuario = newUser;
          });
      } else {
        this.usuario = null;
        this.userSubs.unsubscribe();
        this.store.dispatch(new UnsetUserAction());
      }
    });
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if (fbUser == null) {
          this.router.navigate(['/login']);
        }
        return fbUser != null;
      })
    );
  }

  crearUsuario(nombre: string, email: string, password: string): any {
    this.store.dispatch(new UI.ActivarLoadingAction());
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };
        this.afDb
          .doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(['dashboard']);
            this.store.dispatch(new UI.DesactivarLoadingAction());
          })
          .catch(error => console.error(error));
      })
      .catch((error: any) => {
        console.error(error);
        this.store.dispatch(new UI.DesactivarLoadingAction());
        Swal.fire('Error en el login', error['message'], 'error');
      });
  }

  login(email: string, password: string) {
    this.store.dispatch(new UI.ActivarLoadingAction());
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        this.store.dispatch(new UI.DesactivarLoadingAction());
        this.router.navigate(['/']);
      })
      .catch((error: any) => {
        console.error(error);
        Swal.fire('Error en el login', error['message'], 'error');
      });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.store.dispatch(new UnsetUserAction());
    });
  }

  getUsuario() {
    return { ...this.usuario };
  }
}
