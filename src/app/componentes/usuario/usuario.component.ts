import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../clases/usuario';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario;

  constructor(private authConcesio: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new Usuario();
  }


ngSubmit(form: NgForm) {

  if (form.invalid) { return; }

  Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Se ha registrado con exito...',
      timer: 1500
    });
    // Swal.showLoading();
  this.authConcesio.CrearUsuarioNuevo(form.value);
  this.router.navigate(['/Login']);

  }

  volverAlLogin() {
    this.router.navigate(['/Login']);
  }

}
