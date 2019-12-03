import { Injectable } from '@angular/core';
import { Concesionaria } from '../clases/Concesionaria';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vehiculo } from '../clases/vehiculo';

type CollentionPredicate<T> = string | AngularFirestoreCollection;
type DocumentPredicate<T> = string | AngularFirestoreDocument;

@Injectable({
  providedIn: 'root'
})
export class ConcesioService {

  private dbPathConcesio = '/Concesionaria';
  concesionariaCollection: AngularFirestoreCollection;
  autoCollection: AngularFirestoreCollection<Vehiculo>;
  automoviles: Observable<Vehiculo[]>;
  concesionaria: Observable<Concesionaria[]>;
  concesionariaDoc: AngularFirestoreDocument<Concesionaria>;


  idConcesionariaActual = 'UsXRSWuO2zgd8uQbhSyN';


  RefConcesio: AngularFireList<Concesionaria> = null;

  constructor(private db: AngularFireDatabase, private miBase: AngularFirestore) {
    this.RefConcesio = db.list(this.dbPathConcesio);
    // this.concesionaria = this.miBase.collection('concesionaria').valueChanges();
    this.autoCollection = this.miBase.collection('vehiculo');
    this.automoviles = this.miBase.collection<Vehiculo>('vehiculo').valueChanges();
    this.concesionariaCollection = this.miBase.collection('concesionaria');
    this.concesionaria = this.concesionariaCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Concesionaria;
        data.key = a.payload.doc.id;
        // this.idConcesionariaActual = a.payload.doc.id;
        return data;
      });
    }));
  }

  private col<T>(ref: CollentionPredicate<T>, queryFn?): AngularFirestoreCollection{
    return typeof ref === 'string' ? this.miBase.collection(ref, queryFn) : ref;
  }


  getConcesio() {
    return this.concesionaria;
  }

  getVehiculos() {
     return this.automoviles;
  }

  addVehiculo(auto: Vehiculo): boolean {
    auto.concesionaria = this.idConcesionariaActual;
    if (this.autoCollection.add({...auto})) {
      return true;
    } else {
      return false;
    }
  }

  deleteConcesio(concesio: Concesionaria) {
    this.concesionariaDoc = this.miBase.doc(`concesionaria/${concesio.key}`);
    this.concesionariaDoc.delete();
  }



  createConcesio(concesio: Concesionaria, urlFoto: string): void {
    const con = new Concesionaria();
    con.email = concesio.email;
    con.password = concesio.password;
    con.razonSocial = concesio.razonSocial;
    con.telefono = concesio.razonSocial;
    con.localidad = concesio.localidad;
    con.urlFoto = urlFoto;
    this.RefConcesio.push({...concesio});
  }











}
