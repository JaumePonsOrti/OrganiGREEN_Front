import { Component, EventEmitter, Output, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from '../../../services/menu/menu.service';
import { Debug } from '../../../helpers/Debug';
import { ConectadoService } from '../../../services/conectado/conectado.service';
import { Subscription, interval } from 'rxjs';

import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../../environments/environment';


@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent extends Debug {
  timerSubscripcion!: Subscription;
  mostrarAlertaDesconectado = false;
  mostrarAlertaConectado = false;
  
  @Output() menuAbierto = new EventEmitter<boolean>();
  constructor(
    public conectadoService: ConectadoService,
    public menuService: MenuService, 
    public usuarioService: UsuariosService,
    public router: Router,
  ) 
  {
    super(true);
    //Nos subscrivimos a el menu
    this.menuService.getMenuDeApi().subscribe();

    this.timerSubscripcion = interval(
      environment.tiempoComprobarSiHayConexion
    ).subscribe({
      next: (tiempo) => {
        this.conectadoService.ping().subscribe({
          next: (response) => {
            this.menuService.getMenuDeApi().subscribe();
            if (this.conectadoService.estadoAnterior !== this.conectadoService.conectada) {
              this.mostrarAlertaDesconectado = false;
              this.mostrarAlertaConectado = true;
              this.conectadoService.alertAbierto = true;
            }        
          },
          error: (err) => {
            if (this.conectadoService.estadoAnterior !== this.conectadoService.conectada) {
              this.mostrarAlertaDesconectado = true;
              this.mostrarAlertaConectado = false;
              this.conectadoService.alertAbierto = true;
            }
            
          },
        });
      },
      error: (err) => {},
    });
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesion();
    this.router.navigateByUrl('/');
   
  }

  ngOnDestroy(): void {
    this.timerSubscripcion.unsubscribe();
  }

  onClose(g:any){
    this.conectadoService.alertAbierto = false;

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

  
}
