import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AppKeyInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Agregar encabezado de AppKey a todas las solicitudes
    const modifiedRequest = request.clone({
      headers: request.headers.set('AppKey', environment.appKey)
    });

    // Continuar con el siguiente interceptor o con la solicitud original
    return next.handle(modifiedRequest);
  }
}