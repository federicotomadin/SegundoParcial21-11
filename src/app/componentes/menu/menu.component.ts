import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ConcesioService } from '../../servicios/concesio.service';
import { take, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

 public email = '';
 public razonSocial = '';
 public estaLogueado = false;


  constructor(private concesioService: ConcesioService,
              private authUser: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    // this.email = afAuth.auth.currentUser.email;
    this.estaLogueado = true;

    if (authUser.usuarioConectado) {
    this.concesioService.getConcesio().subscribe(resp => {
     
      resp.map( datos => {
        this.email = datos.email;
        this.razonSocial = datos.razonSocial;
      });
    });
  }

    if (this.authUser.isLogin) {
      this.estaLogueado = true;
      this.email = afAuth.auth.currentUser.email;
   }
  }

  ngOnInit() {
    this.estaLogueado = true;
    if (this.router.url === '/Login' ) {
     this.SalirDeLaSesion();

    } else {
      if (this.router.url === '/Login' ) {
        this.SalirDeLaSesion();
      } else {

    this.concesioService.getConcesio().subscribe(resp => {
      resp.map( datos => {
        this.email = datos.email;
        this.razonSocial = datos.razonSocial;
        this.estaLogueado = true;
      });
    });
  }
}
  }


  SalirDeLaSesion() {
    this.estaLogueado = false;
    this.authUser.isLogin = false;
    this.authUser.Logout();
    this.router.navigate(['/Login']);
  }

}
