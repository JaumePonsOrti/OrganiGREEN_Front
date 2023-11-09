import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Credentials } from '../../models/Credentials';
import { HashService } from '../crytp/hash.service';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { SesionService } from '../sesion/sesion.service';
import { Usuario } from '../../models/usuario';
import { User } from 'projects/super-lib/src/lib/modulos/Super-Sidebars/super-sidebar-avierta/super-sidebar-avierta.component';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = environment.apiUrl+"/usuario";
  loggedIn: boolean = false;
  //username: string = '';
  token: string = '';
  user:Usuario = {
    usuario_email:"123",
    usuario_token:"",
    usuario_rol:null,
    usuario_imagen: "string",
  };
  userLimpio:Usuario = 
  {
    usuario_email:"123",
    usuario_token:"",
    usuario_rol:null,
    usuario_imagen: "string",
  };
  //cookieNameVar:string = this.hasher.sha3_512("auth_code");
  cookieNameVar:string = "token";
  cookieNameVar2:string = "user";

  constructor(
    private http: HttpClient,
    private cookieService:CookieService, 
    private hasher:HashService,
    private router: Router,
    private sesion:SesionService
  ) {
    if(this.cookieService.get(this.cookieNameVar) != ""){
      this.token=this.cookieService.get(this.cookieNameVar);
    }
   }

  login(username: string, password: string): Observable<any> {
    const credential:Credentials ={
      username:username,
      password:password
    }
    if(environment.production===false){
      console.log("Credenciales a enviar login:",credential);
    }
    return this.http.post<any>(`${this.apiUrl}/login`, credential)
      .pipe(
        map(response => {
          this.loggedIn = true;
          this.sesion.caducada = false;
          this.token = response.usuario_token;
          this.user = Object.assign({}, response);
      
          this.cookieService.set(this.cookieNameVar,response.usuario_token,1);
          this.cookieService.set(this.cookieNameVar2,response,1);
          console.log("USUARIO:", this.user);
          console.log("USUARIO en response:", response);
          return response;
        }),
        catchError(error => {
          this.loggedIn = false;
          //this.username = '';
          this.token = '';
          return throwError(error);
        })
      );
  }

  getToken(){
   
    return this.token;
  }
  
  getUserSidebar(){
    let user:User = {
      usuario_email:this.user.usuario_email,
      imagen_usuario: this.user.usuario_imagen
    }
    return  user;
  }
 
  cerrarSesion(sesionCaducada?:boolean){
    this.token = "";
    this.loggedIn = false;
    this.user = Object.assign({},this.userLimpio);
    this.cookieService.delete(this.cookieNameVar);
    this.cookieService.delete(this.cookieNameVar2);
    if(sesionCaducada){
      this.sesion.caducada = true;
    }
    this.router.navigate(['/']);
  }
}