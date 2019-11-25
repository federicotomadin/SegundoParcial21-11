import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Concesionaria } from '../../clases/Concesionaria';
import { ConcesioService } from '../../servicios/concesio.service';
import { FirebaseStorageService } from '../../servicios/firebase-storage.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  concesio: Concesionaria;
  urlPublica: string;
  cargarFotoLogin: string;

  constructor(private authConcesio: AuthService, private router: Router,
              private serviceFireStorage: FirebaseStorageService,
              private concesionariaService: ConcesioService) {

   }

  ngOnInit() {
    this.concesio = new Concesionaria();
  }

ngSubmit(form: NgForm) {

  if (form.invalid) { return; }

  Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Se ha registrado con exito...',
      timer: 1500
    });
    // Swal.showLoading();
  this.authConcesio.CrearUsuario(form.value, this.cargarFotoLogin);
  this.router.navigate(['/Login']);

  }

  public onFileSelectd($event) {

    if ($event.target.files.length === 1) {
      this.serviceFireStorage.referenciaCloudStorage($event.target.files[0].name).getDownloadURL()
       .subscribe(resp  => {
         this.urlPublica = resp + '_thumb_' + '_480.' + ($event.target.files[0].type).substr(6, 3).toString();
         this.cargarFotoLogin = resp + '_thumb_' + '_480.' + ($event.target.files[0].type).substr(6, 3);

         Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'Imagen cargada con exito'
});
      }, (error) => {
        console.error(error);
      });

      this.serviceFireStorage.tareaCloudStorage($event.target.files[0].name, $event.target.files[0]);
   }

}
}
