import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, interval, map, throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConectadoService {
 
  constructor(private http:HttpClient) { }
  
  //La siguiente variable comunica a el resto de la app que no se ha hecho ping con el servidor
  conectada!:boolean;
  estadoAnterior!:boolean;
  alertAbierto:boolean = false;
  ping():Observable<any>{
    return this.http.get(environment.apiUrl+'/ping') .pipe(
      map(response => {
        this.estadoAnterior = this.conectada;
        this.conectada = true;
        
        //alert("conectado");
        return response;
      }),
      catchError(error => {
        this.estadoAnterior = this.conectada;
        this.conectada=false;
        //this.username = '';
      
        return throwError(error);
      })
    );
  }
}
