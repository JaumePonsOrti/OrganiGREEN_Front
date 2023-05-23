import { Component, OnDestroy } from '@angular/core';
import { ConectadoService } from './core/shared/services/conectado/conectado.service';
import { Subscription, interval } from 'rxjs';

import { UsuariosService } from './core/shared/services/usuarios/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
 constructor(private conectadoService: ConectadoService,
  usuarioService: UsuariosService) {
  this.conectadoService.ping().subscribe((response) => {
    console.log(this.conectadoService.conectada);
  });
 }

}