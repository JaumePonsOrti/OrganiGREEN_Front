import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosService } from './shared/services/usuarios/usuarios.service';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {
    constructor (private usuSer:UsuariosService){

    }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Agregar encabezados comunes a todas las solicitudes
    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + this.usuSer.token)
    });

    // Manipular la solicitud antes de enviarla
    console.log('Solicitud interceptada:', modifiedRequest);

    // Continuar con el siguiente interceptor o con la solicitud original
    return next.handle(modifiedRequest);
  }
}