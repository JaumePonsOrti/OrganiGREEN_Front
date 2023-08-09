import { Component, Input } from '@angular/core';
import { Escaler } from '../../escaler/escaler';
import { linkMenu } from '../interface/MenuConfig';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-menu-overlayable',
  templateUrl: './menu-overlayable.component.html',
  styleUrls: ['./menu-overlayable.component.scss']
})
export class MenuOverlayableComponent extends Escaler{
  environment:any = environment;
  @Input() configLinks:Array<linkMenu> =[
    {
      enlace:"#inicio",
      texto:"Inicio"
    },
    {
      enlace:"#acerca-de-mi",
      texto:"Acerca de mi"
    },
    {
      enlace:"#servicios",
      texto:"Servicios"
    },
    {
      enlace:"#contacto",
      texto:"Contacto"
    },
  ];

  abrirCerrarMenu(){
    switch (this.isMenuOpen) {
      case false:
        this.isMenuOpen  = true;
        break;
      case true:
        this.isMenuOpen = false;
        break;
      default:
        break;
    }
  }
}
