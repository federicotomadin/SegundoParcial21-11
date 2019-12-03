import { Component, OnInit } from '@angular/core';
import { ConcesioService } from 'src/app/servicios/concesio.service';

@Component({
  selector: 'app-grilla-completa',
  templateUrl: './grilla-completa.component.html',
  styleUrls: ['./grilla-completa.component.css']
})
export class GrillaCompletaComponent implements OnInit {

  automoviles = [];

  constructor(private concesioService: ConcesioService) { }

  ngOnInit() {
    this.concesioService.getVehiculos().subscribe( resp => {
      console.log(resp);
      this.automoviles = resp;
    });

  }

}
