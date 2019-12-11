import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { ConcesioService } from './servicios/concesio.service';
import { AuthService } from './servicios/auth.service';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private authService:AuthService ,private router: Router, private concesioService: ConcesioService)  {}
  
    canActivate(): boolean {
 
     this.authService.getUsuario();
                

      this.afAuth.auth.onAuthStateChanged(user => {
        console.log(user.email);

       
        if (user !== null) {     
            return true;
        } else {
         return false
        }
      })
      return false;
}

  
  
  
}
