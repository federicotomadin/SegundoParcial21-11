import { Component, OnInit } from '@angular/core';
import { ConcesioService } from 'src/app/servicios/concesio.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-grilla-completa',
  templateUrl: './grilla-completa.component.html',
  styleUrls: ['./grilla-completa.component.css']
})
export class GrillaCompletaComponent implements OnInit {

  autosYConcesios = [];
  concesio = [];
  filterTipo = '';
  vCardData = '';


  constructor(private concesioService: ConcesioService) { }

  ngOnInit() {
    this.concesioService.getVehiculos().subscribe( resp => {
       resp.map( dat => {
         const datos = {
           marca: dat.marca,
           modelo: dat.modelo,
           año: dat.anio,
           kilometros: dat.kilometros,
           tipo: dat.tipo
         };
         this.vCardData = JSON.stringify(datos);
       });
       this.autosYConcesios = resp;
      });
  }

}
