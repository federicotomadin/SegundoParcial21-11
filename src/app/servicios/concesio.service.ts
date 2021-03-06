import { Injectable } from '@angular/core';
import { Concesionaria } from '../clases/Concesionaria';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, pipe } from 'rxjs';
import { map, concat } from 'rxjs/operators';
import { Vehiculo } from '../clases/vehiculo';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../clases/usuario';

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
  VehiculoDoc: AngularFirestoreDocument<Vehiculo>;


  idConcesionariaActual: any;
  public razonSocial: string;

  RefUsuario: AngularFireList<Usuario> = null;
  RefConcesio: AngularFireList<Concesionaria> = null;

  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase, private miBase: AngularFirestore) {
    this.RefConcesio = db.list(this.dbPathConcesio);
    // this.concesionaria = this.miBase.collection('concesionaria').valueChanges();
    this.autoCollection = this.miBase.collection('vehiculo');
    this.automoviles = this.autoCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Vehiculo;
        data.key = a.payload.doc.id;
        return data;
      });
    }));
    this.concesionariaCollection = this.miBase.collection('concesionaria');
    this.concesionaria = this.concesionariaCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Concesionaria;
        this.razonSocial = data.razonSocial;
        data.key = a.payload.doc.id;
        this.idConcesionariaActual = a.payload.doc.id;
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

  // getAuth() {
  //   return this.auth.authState.subscribe().pipe(map( resp => {
    
  //   }))
  // }

  getVehiculos() {
   return this.automoviles;
  }

  addVehiculo(auto: Vehiculo, razonSoc: string): boolean {
    auto.concesionaria = razonSoc;
    if (this.autoCollection.add({...auto})) {
      return true;
    } else {
      return false;
    }
  }

  deleteConcesio(auto: Vehiculo) {
    console.log( this.automoviles);
    this.VehiculoDoc = this.miBase.doc(`vehiculo/${auto.key}`);
    this.VehiculoDoc.delete();
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

  createUsuarioNuevo(usuario: Usuario): void {

   this.RefUsuario.push({...usuario});

  }











}
