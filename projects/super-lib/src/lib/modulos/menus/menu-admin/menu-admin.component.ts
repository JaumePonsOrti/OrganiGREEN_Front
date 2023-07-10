import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
//import { Debug } from '../../../helpers/Debug';
//import { ConectadoService } from '../../../services/conectado/conectado.service';
import { Subscription, interval } from 'rxjs';

//import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { Enlace_Menu } from '../models/enlace_menu';
//import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'super-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent {
  timerSubscripcion!: Subscription;
  mostrarAlertaDesconectado = false;
  mostrarAlertaConectado = false;
  
  @Output() menuAbierto = new EventEmitter<boolean>();
  
  @Input() elementos_menu !: Enlace_Menu[] ;
  constructor(
    
    public router: Router,
  ) 
  {
    //super(true);
    //Nos subscrivimos a el menu
    
  }
  
  cerrarSesion() {
    //this.usuarioService.cerrarSesion();
    this.router.navigateByUrl('/');
   
  }

  ngOnDestroy(): void {
    this.timerSubscripcion.unsubscribe();
  }

  onClose(g:any){
   // this.conectadoService.alertAbierto = false;

  }

  seeSidebar = true;
  marginLeft =  "";
  openScroll() {
		if (this.seeSidebar) {
      this.seeSidebar = false;
      this.marginLeft =  "ml-0";
    }
    else{
      this.seeSidebar = true;
      this.marginLeft =  "";
      
    }
    this.menuAbierto.emit(this.seeSidebar);
	}

  ifMayorQue0(item:Array<any>){
    if(typeof item != "undefined"){
      return true;
    }
    return false;
  }

  generarEnlace(menu:any){
    let m = "intranet/"+menu.tipo_de_view +"/"+menu.controlador;
    return m;
  }

  cambiarAEnlace(menu:any){
    //this.menuService.setPaginaActual(menu);
    this.router.navigate([menu.enlace]);
  }
}
