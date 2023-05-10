import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../../models/Credentials';
import { HashService } from '../crytp/hash.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = environment.apiUrl+"/usuario";
  loggedIn: boolean = false;
  //username: string = '';
  token: string = '';
  //cookieNameVar:string = this.hasher.sha3_512("auth_code");
  cookieNameVar:string = "token";
  constructor(private http: HttpClient, private cookieService:CookieService, private hasher:HashService) {
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
          this.token = response.access_token;
          this.cookieService.set(this.cookieNameVar,response.access_token,1);
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
  
  cerrarSesion(){
    this.token = "";
    this.cookieService.delete(this.cookieNameVar);
  }
}