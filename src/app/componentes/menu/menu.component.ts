import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ConcesioService } from '../../servicios/concesio.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

 public email = '';
 public razonSocial = '';
 public isLogin = false;

  constructor(private concesioService: ConcesioService,
              private authUser: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    // this.email = afAuth.auth.currentUser.email;

    if (authUser.usuarioConectado) {
    this.concesioService.getConcesio().subscribe(resp => {

      resp.map( datos => {
        this.email = datos.email;
        this.razonSocial = datos.razonSocial;
      });
    });
  }

    if (this.email !== '') {
      this.isLogin = true;
      this.email = afAuth.auth.currentUser.email;
   }
  }

  ngOnInit() {
    this.concesioService.getConcesio().subscribe(resp => {
      resp.map( datos => {
        this.email = datos.email;
        this.razonSocial = datos.razonSocial;
        this.isLogin = true;
      });
    });
  }


  SalirDeLaSesion() {
    this.isLogin = false;
    this.authUser.Logout();
    this.router.navigate(['/Login']);
  }

}
