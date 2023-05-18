import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, interval, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConectadoService {
 
  constructor(private http:HttpClient) { }
  
  //La siguiente variable comunica a el resto de la app que no se ha hecho ping con el servidor
 conectada:boolean = false;
  ping():Observable<any>{
    return this.http.get(environment.apiUrl+'/ping') .pipe(
      map(response => {
        this.conectada = true;
        //alert("conectado");
        return response;
      }),
      catchError(error => {
        this.conectada=false;
        //this.username = '';
      
        return throwError(error);
      })
    );
  }
}
