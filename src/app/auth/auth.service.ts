import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private af: AngularFireAuth, private router: Router) { }

  crearUsuario(nombre: string, email: string, password: string): any {
    this.af.auth
      .createUserWithEmailAndPassword(email, password)
      .then( resp => {
        this.router.navigate(['dashboard']);
        console.log(resp);
      })
      .catch((error: any) => {
      console.error(error);
      Swal.fire('Error en el login', error['message'], 'error')
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
      Swal.fire('Error en el login', error['message'], 'error')
    });
  }


}
