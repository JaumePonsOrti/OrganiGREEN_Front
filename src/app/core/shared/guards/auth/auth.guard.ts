import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  // El método canActivate que se ejecuta antes de activar una ruta
  canActivate(): boolean {
    // Obtiene el token de otra forma
    const token = this.usuariosService.getToken();
    // Si hay token
    if (token) {
      //Si el token no es un string vacio
      if(token !=""){
        return true;
      }
      return false;
      /*
      // Verifica el token con el servicio de autenticación
      this.usuariosService.verifyToken(token).subscribe(
        res => {
          // Si el token es válido, devuelve true y permite la navegación
          if (res.valid) {
            return true;
          }
          // Si el token no es válido, redirige al login y devuelve false
          else {
            this.router.navigate(['/login']);
            return false;
          }
        },
        err => {
          // Si hay algún error en la petición, redirige al login y devuelve false
          this.router.navigate(['/login']);
          return false;
        }
      );
      */
    }
    // Si no hay token, redirige al login y devuelve false
    else {
      this.router.navigate(['/']);
      return false;
    }
  }

}