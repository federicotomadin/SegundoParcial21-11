import { Component, OnInit } from '@angular/core';
import { ConcesioService } from '../../servicios/concesio.service';
import { FirebaseStorageService } from '../../servicios/firebase-storage.service';
import { Vehiculo } from '../../clases/vehiculo';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  vehiculo: Vehiculo;
  urlPublica: string;
  razonSocial: string;

  constructor( private serviceFireStorage: FirebaseStorageService,
               private concesionariaService: ConcesioService) { }

  ngOnInit() {
    this.vehiculo = new Vehiculo();
    this.concesionariaService.getConcesio().subscribe(concesio => {
       concesio.map(algo => {
        this.razonSocial = algo.razonSocial;
      }); });
  }

  ngSubmit(form: NgForm) {

    if (form.invalid) { return; }

    if (this.concesionariaService.addVehiculo(this.vehiculo, this.razonSocial)) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Se ha registrado con exito...',
        timer: 1500
      });

    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        text: 'Error al cargar',
        timer: 1500
      });
    }
    }

  public onFileSelectd($event) {

    if ($event.target.files.length === 1) {
      console.log(this.serviceFireStorage.referenciaCloudStorage($event.target.files[0].name).getDownloadURL());
      this.serviceFireStorage.referenciaCloudStorage($event.target.files[0].name).getDownloadURL()
       .subscribe(resp  => {
         console.log(resp);
         this.urlPublica = resp + '_thumb_' + '5.' + ($event.target.files[0].type).substr(6, 3).toString();
         this.vehiculo.foto =  resp + '_thumb_' + '5.' + ($event.target.files[0].type).substr(6, 3).toString();

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
