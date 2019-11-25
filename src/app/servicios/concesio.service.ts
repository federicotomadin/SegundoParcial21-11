import { Injectable } from '@angular/core';
import { Concesionaria } from '../clases/Concesionaria';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ConcesioService {

  private dbPathConcesio = '/Concesionaria';

  RefConcesio: AngularFireList<Concesionaria> = null;

  constructor(private db: AngularFireDatabase) {
    this.RefConcesio = db.list(this.dbPathConcesio);
  }


  createConcesio(concesio: Concesionaria, urlFoto: string): void {
    const con = new Concesionaria();
    con.email = concesio.email;
    con.password = concesio.password;
    con.razonSocial = concesio.razonSocial;
    con.telefono = concesio.razonSocial;
    con.localidad = concesio.localidad;
    con.urlFoto = urlFoto;
    this.RefConcesio.push(con);
  }

  getConcesio(concesio: Concesionaria) {
    return this.RefConcesio = this.db.list('concesionaria');
}









}
