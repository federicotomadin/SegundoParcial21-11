import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
// import { MateriaComponent } from './componentes/materia/materia.component';
// import { ProfesorComponent } from './componentes/profesor/profesor.component';
// import { AlumnoComponent } from './componentes/alumno/alumno.component';
// import { AdministradorComponent } from './componentes/administrador/administrador.component';
// import { ErrorComponent } from './componentes/error/error.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './componentes/home/home.component';
import { VehiculoComponent } from './componentes/vehiculo/vehiculo.component';
import { GrillaCompletaComponent } from './componentes/grilla-completa/grilla-completa.component';


const MiRuteo = [
  {path: '' , component: LoginComponent},
  {path: 'Login' , component: LoginComponent},
  {path: 'Registro' , component: RegistroComponent},
  {path: 'Home' , component: HomeComponent},
  {path: 'Vehiculo' , component: VehiculoComponent},
  {path: 'GrillaCompleta' , component: GrillaCompletaComponent}   ];

  // canActivate: [AuthGuard]
  // {path: '**' , component: ErrorComponent},
  // {path: 'error' , component: ErrorComponent}];

@NgModule({
  imports: [RouterModule.forRoot(MiRuteo)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
