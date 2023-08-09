import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConectadoService } from './core/shared/services/conectado/conectado.service';
import { Subscription, interval } from 'rxjs';

import { UsuariosService } from './core/shared/services/usuarios/usuarios.service';
import { MenuService } from './core/shared/services/menu/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  
 constructor(private conectadoService: ConectadoService,
  private menuService: MenuService,
  usuarioService: UsuariosService) {
  this.conectadoService.ping().subscribe((response) => {
    console.log(this.conectadoService.conectada);
  });
 }
  ngOnInit(): void {
    this.menuService.getMenuDeApi().subscribe({});
    
  }

}