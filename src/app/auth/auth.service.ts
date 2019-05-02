import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private af: AngularFireAuth, private router: Router, private afDb: AngularFirestore) { }

  isAuth() {
    return this.af.authState
      .pipe(
        map( fbUser => {
          if (fbUser == null) {
            this.router.navigate(['/login']);
          }
          return fbUser != null;
          })
      );
  }

  initAuthListener() {
    this.af.authState.subscribe(fbUser => {
      console.log(fbUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string): any {
    this.af.auth
      .createUserWithEmailAndPassword(email, password)
      .then( resp => {
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };

        this.afDb.doc(`${user}/usuario`)
          .set(user)
            .then(() => {
              this.router.navigate(['dashboard']);
            })
            .catch(error => console.error(error));
      })
      .catch((error: any) => {
      console.error(error);
      Swal.fire('Error en el login', error['message'], 'error');
    });
  }

  login(email: string, password: string) {
    this.af.auth
    .signInWithEmailAndPassword(email, password)
    .then( data => {
      this.router.navigate(['dashboard']);
      console.log(data);
    })
    .catch((error: any) => {
      console.error(error);
      Swal.fire('Error en el login', error['message'], 'error');
    });
  }

  logout() {
    this.router.navigate(['/login']);
    this.af.auth.signOut();
  }


}
