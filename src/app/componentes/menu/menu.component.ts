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

 public email = 'email';
 public razonSocial = '';

  constructor(private concesioService: ConcesioService,
              private authUser: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.email = afAuth.auth.currentUser.email;

    this.concesioService.getConcesio().subscribe(resp => {
      resp.map( datos => {
        console.log(datos);
            this.razonSocial = datos.razonSocial;
      });
    });
  }


  ngOnInit() {
    // this.concesioService.getConcesio().subscribe(resp => {
    //   resp.map( datos => {
    //       if (this.email === datos.email) {
    //         this.razonSocial = datos.razonSocial;
    //       }
    //   });
    // });
  }


  SalirDeLaSesion() {
    this.authUser.Logout();
    this.router.navigate(['/Login']);
  }

}
