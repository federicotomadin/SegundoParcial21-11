import { Component, OnInit } from '@angular/core';
import { ConcesioService } from 'src/app/servicios/concesio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  index: number;
  listaConcesianarias = [];
  mostrarLocalidad = false;
  mostrarRazonSocial = false;
  mostrarTelefono = false;

  constructor(private concesioService: ConcesioService) { }

  ngOnInit() {
     this.concesioService.getConcesio().subscribe(concesio => {
       this.listaConcesianarias = concesio; });
  }


}
