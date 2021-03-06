import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';



import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FirebaseStorageService } from './servicios/firebase-storage.service';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { environment } from 'src/environments/environment';
import { ConcesioService } from './servicios/concesio.service';
import { QRCodeModule } from 'angular2-qrcode';
import { MenuComponent } from './componentes/menu/menu.component';
import { ErrorComponent } from './componentes/error/error.component';
import { MiCaptchaComponent } from './componentes/mi-captcha/mi-captcha.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { HomeComponent } from './componentes/home/home.component';
import { VehiculoComponent } from './componentes/vehiculo/vehiculo.component';
import { ListadoVehiculosComponent } from './componentes/listado-vehiculos/listado-vehiculos.component';
import { GrillaCompletaComponent } from './componentes/grilla-completa/grilla-completa.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ConcesionariaPipe } from './pipes/concesionaria.pipe';
import { ConvertirTipoImagenPipe } from './pipes/convertir-tipo-imagen.pipe';
import { UsuarioComponent } from './componentes/usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    MenuComponent,
    ErrorComponent,
    MiCaptchaComponent,
    HomeComponent,
    VehiculoComponent,
    ListadoVehiculosComponent,
    GrillaCompletaComponent,
    FilterPipe,
    ConcesionariaPipe,
    ConvertirTipoImagenPipe,
    UsuarioComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    QRCodeModule,
    RecaptchaModule.forRoot()
  ],
  providers: [ConcesioService, FirebaseStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
