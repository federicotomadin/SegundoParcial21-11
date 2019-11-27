import { Component, OnInit } from '@angular/core';
import { ConcesioService } from 'src/app/servicios/concesio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listaConcesianarias = [];

  constructor(private concesioService: ConcesioService) { }

  ngOnInit() {
     this.concesioService.getConcesio().subscribe(concesio => {
      console.log(concesio);
      this.listaConcesianarias = concesio; });
  }

}
