import { Injectable } from '@angular/core';
import { Concesionaria } from '../clases/Concesionaria';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConcesioService {

  private dbPathConcesio = '/Concesionaria';
  concesionariaCollection;
  concesionaria: Observable<Concesionaria[]>;
  concesionariaDoc;

  RefConcesio: AngularFireList<Concesionaria> = null;

  constructor(private db: AngularFireDatabase, private miBase: AngularFirestore) {
    this.RefConcesio = db.list(this.dbPathConcesio);
    this.concesionaria = this.miBase.collection('concesionaria').valueChanges();
  }

  getConcesio() {
    return this.concesionaria;
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











}
