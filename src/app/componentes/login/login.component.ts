import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Concesionaria } from '../../clases/Concesionaria';
import { auth } from 'firebase';
import { ConcesioService } from '../../servicios/concesio.service';
import { FirebaseStorageService } from 'src/app/servicios/firebase-storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recordarme = false;
  usuario: Concesionaria;
  captchaLogin = 'vacio';
  vCardData = 'codigo qr vacio';
  authError: any;
  logueado: string;
  mostrarImagen = false;
  urlFoto: string;

  constructor(private authConcesio: AuthService, private router: Router, private fireStorageService: FirebaseStorageService ) {
    this.TraerImagenConcesionaria();
   }

  ngOnInit() {
    this.usuario = new Concesionaria();

    if (localStorage.getItem('email')) {
      this.captchaLogin = 'vacio';
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
    this.authConcesio.eventAuthErrors.subscribe( data => {
    this.authError = data;
      });
  }

TraerImagenConcesionaria() {
  if (localStorage.getItem('urlFoto')) {
    this.mostrarImagen = true;
    this.urlFoto = localStorage.getItem('urlFoto');
  } else {
    this.urlFoto = '../../../assets/imagenes/login.png';
  }

  // this.fireStorageService.referenciaCloudStorage(localStorage.getItem('urlFoto'));
}

  ReconociendoCaptcha(cap: string) {
    this.captchaLogin = cap;
  }

  Login(form: NgForm) {

    if (form.invalid) { return; }
    if (this.captchaLogin === 'vacio') {

  setTimeout(function() {
    Swal.fire({
    allowOutsideClick: false,
    icon: 'error',
    text: 'Captcha no validado',
  });
 }, 200);
  Swal.close();
  this.router.navigate(['/Login']);
  return;
}

    Swal.fire({
 allowOutsideClick: false,
 icon: 'info',
 text: 'Ingresando...',
 timer: 2000
});
    Swal.showLoading();

    this.authConcesio.Login(form.value);

    if (this.recordarme) {
    localStorage.setItem('email', this.usuario.email);
  }
    Swal.close();
}

ngSubmit(form: NgForm) {

this.Login(form);

}

}
