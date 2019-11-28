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


const MiRuteo = [
  {path: '' , component: HomeComponent},
  {path: 'Login' , component: LoginComponent},
  {path: 'Registro' , component: RegistroComponent},
  {path: 'Home' , component: HomeComponent}];

  // canActivate: [AuthGuard]
  // {path: '**' , component: ErrorComponent},
  // {path: 'error' , component: ErrorComponent}];

@NgModule({
  imports: [RouterModule.forRoot(MiRuteo)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
