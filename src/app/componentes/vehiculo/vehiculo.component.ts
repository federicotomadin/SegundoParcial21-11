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

  constructor( private serviceFireStorage: FirebaseStorageService,
               private concesionariaService: ConcesioService) { }

  ngOnInit() {
    this.vehiculo = new Vehiculo();
  }

  ngSubmit(form: NgForm) {

    }

  public onFileSelectd($event) {

    if ($event.target.files.length === 1) {
      this.serviceFireStorage.referenciaCloudStorage($event.target.files[0].name).getDownloadURL()
       .subscribe(resp  => {
         this.urlPublica = resp + '_thumb_' + '_220.' + ($event.target.files[0].type).substr(6, 3).toString();

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
