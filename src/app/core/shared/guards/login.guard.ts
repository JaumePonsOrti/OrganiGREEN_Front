import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios/usuarios.service';
import { ConectadoService } from '../services/conectado/conectado.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild {
 
  constructor(
    private usuariosService: UsuariosService, 
    private router: Router, 
    public conectada: ConectadoService) { }

  // El método canActivate que se ejecuta antes de activar una ruta
  canActivate(): boolean {
    // Obtiene el token de otra forma
    const token = this.usuariosService.getToken();
    // Si hay token
    if(this.conectada.conectada == true) {
      return true;
    }
    else{
      this.router.navigate(["/no-conectado"]);
      return false
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
