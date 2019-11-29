import { Injectable } from '@angular/core';
import { Concesionaria } from '../clases/Concesionaria';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConcesioService {

  private dbPathConcesio = '/Concesionaria';
  concesionariaCollection: AngularFirestoreCollection;
  concesionaria: Observable<Concesionaria[]>;
  concesionariaDoc;


  RefConcesio: AngularFireList<Concesionaria> = null;

  constructor(private db: AngularFireDatabase, private miBase: AngularFirestore) {
    this.RefConcesio = db.list(this.dbPathConcesio);
    // this.concesionaria = this.miBase.collection('concesionaria').valueChanges();
    this.concesionariaCollection = this.miBase.collection('concecionaria');
    this.concesionaria = this.concesionariaCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Concesionaria;
        data.key = a.payload.doc.id;
        return data;
      });
    }));
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
