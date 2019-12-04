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
  filterTipo = '';

  constructor(private concesioService: ConcesioService) { }

  ngOnInit() {
    this.concesioService.getVehiculos().subscribe( resp => {
      this.autosYConcesios = resp;
    });

  }

}
