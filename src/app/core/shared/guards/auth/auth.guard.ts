import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { ConectadoService } from '../../services/conectado/conectado.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuariosService: UsuariosService, private router: Router, public conectada: ConectadoService) { }

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
    }
    // Si no hay token, redirige al login y devuelve false
    else  {
      this.router.navigate(['/']);
      return false;
    }
  
  }
  
  canActivateChild(): boolean {
    const token = this.usuariosService.getToken();
    // Si hay token
    if (token) {
      //Si el token no es un string vacio
      if(token !=""){
        return true;
      }
      return false;
    }
    // Si no hay token, redirige al login y devuelve false
    else  {
      this.router.navigate(['/home']);
      return false;
    }
  }
}