import { Injectable } from '@angular/core';
import { Concesionaria } from '../clases/Concesionaria';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { ConcesioService } from './concesio.service';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


public eventAuthError = new BehaviorSubject<boolean>(true);
public eventAuthErrors = this.eventAuthError.asObservable();
public usuarioConectado = false;
public isLogin = false;


  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private dbBase: AngularFireDatabase,
              private router: Router,
              private concesioService: ConcesioService) {
               }


  CrearUsuario(concesio: Concesionaria, urlFoto: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(concesio.email, concesio.password)
   .then( resp => {
     this.concesioService.createConcesio(concesio, urlFoto);
   });
 }

 getUsuario(): string {
  this.afAuth.user.subscribe(resp => {
    return resp.email;
  });
  return '';
 }

 Login(concesio: Concesionaria) {

 
  this.afAuth.auth.signInWithEmailAndPassword(concesio.email, concesio.password)
  .catch(error => {
    this.eventAuthError.next(error);
    Swal.fire({
      allowOutsideClick: false,
      icon: 'error',
      text: 'Credenciales Incorrectas',
      timer: 2000
     });
  })
  .then(concesioCredential => {
    if (concesioCredential) {
      this.usuarioConectado = true;
      this.router.navigate(['/Home']);
 }
});
 }

 estaAutenticado(): boolean {
    
  this.afAuth.auth.onAuthStateChanged(user => {
    if (user !== null) {     
        return true;
    } else {
     return false;
    }
  })
  return false;
}

 Logout() {
  return this.afAuth.auth.signOut();
}
}
