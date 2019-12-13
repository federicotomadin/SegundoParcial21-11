import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Vehiculo } from '../../clases/vehiculo';
import { ConcesioService } from '../../servicios/concesio.service';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-vehiculos',
  templateUrl: './listado-vehiculos.component.html',
  styleUrls: ['./listado-vehiculos.component.css']
})
export class ListadoVehiculosComponent implements OnInit {

  automoviles = [];
  vCardData = '';


  constructor(private concesioService: ConcesioService, private route: Router) { }

  ngOnInit() {
    this.concesioService.getVehiculos().subscribe( resp => {
      resp.map( auto =>  {
        if (this.concesioService.razonSocial === auto.concesionaria) {
          this.automoviles.push(auto);
        }
      });
      });

  }

  DescargarPdf() {

    const doc = new jsPDF('p', 'pt') as JsPDFWithPlugin;
  
    interface JsPDFWithPlugin extends jsPDF {
      autoTable: (options: UserOptions) => jsPDF;
    }
  
    doc.autoTable({html: '#tablaVehiculos'});
    doc.save('automoviles.pdf');
  }

  downloadFile(data: Vehiculo[]) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const blob = new Blob([csvArray], {type: 'text/csv' });
    saveAs(blob, 'automoviles.csv');
}


descargarCSV() {
  this.downloadFile(this.automoviles);
}

EliminarVehiculo(auto: Vehiculo) {
  this.concesioService.deleteConcesio(auto);
  this.route.navigate(['/Home']);
}

cargarVehiculo(auto: Vehiculo) {
      const datos = {
        marca: auto.marca,
        modelo: auto.modelo,
        año: auto.anio,
        kilometros: auto.kilometros,
        tipo: auto.tipo
      };
      this.vCardData = JSON.stringify(datos);
}
}
