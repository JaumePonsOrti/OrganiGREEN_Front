import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ISuperDesplegableConfig } from 'projects/super-lib/src/lib/modulos/super-desplegable/super-desplegable/model/IDesplegableConfig';
import { MenuService } from '../../services/menu/menu.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';

@Component({
  selector: 'app-desplegable',
  templateUrl: './desplegable.component.html',
  styleUrls: ['./desplegable.component.scss'],
})
export class DesplegableComponent  implements OnInit {

 
  @Input() configs: ISuperDesplegableConfig[] = [];
  @Output() private clickCerrarSesion: EventEmitter<any> = new EventEmitter();
  constructor(
      public menuService:MenuService,
    

    ) { }
  
  ngOnInit() {}


  
  cerrarSesion() { 
    this.clickCerrarSesion.emit();
  }
}

export interface IDesplegableViewConfig{

}