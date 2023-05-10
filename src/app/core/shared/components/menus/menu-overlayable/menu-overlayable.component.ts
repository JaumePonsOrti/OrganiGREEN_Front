import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Escaler } from '../../escaler/escaler';
import { linkMenu } from '../interface/MenuConfig';

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
