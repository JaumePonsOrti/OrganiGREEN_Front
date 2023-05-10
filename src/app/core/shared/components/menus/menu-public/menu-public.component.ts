import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { linkMenu } from '../interface/MenuConfig';

@Component({
  selector: 'app-menu-public',
  templateUrl: './menu-public.component.html',
  styleUrls: ['./menu-public.component.scss']
})
export class MenuPublicComponent {
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

  isMenuOpen = false;
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
