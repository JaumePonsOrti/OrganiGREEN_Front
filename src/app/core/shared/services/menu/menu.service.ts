import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Debug } from '../../helpers/Debug';
import { Enlace_Menu } from '../../models/enlace_menu';
import { environment } from '../../../../../environments/environment';
import { UsuariosService } from '../usuarios/usuarios.service';
import { ConfigSidebar } from 'projects/super-lib/src/lib/modulos/Super-Sidebars/super-sidebar-avierta/super-sidebar-avierta.component';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends Debug{
  public menus:any[] = [];
  public paginaActual:any;

  apiUrl:string = environment.apiUrl+"/menu";
  constructor(
    private http: HttpClient,
    private usuario:UsuariosService
  ) {
    super(true);
    console.log("USER:",this.usuario.user);
  }
  
  public configSidebar: ConfigSidebar = {
    tipo: 'g',
    tema: 'bg',
    brandName:"Organi GREEN",
    barraBusqueda:  {
      nombre_campo:"enlaceMENU",
      nombre_visible:"Busqueda ...",
      tipo_input:"text",
      campo_mostrar:{
        nombre_campo:"nombre_del_campo",
        nombre_tabla:"unidad_medida",
      },
      search_type:"search_with_button_integrated"
    }
  };

  getMenuDeApi(): Observable<any> {
    return this.http.get(this.apiUrl+'/get') .pipe(
      map(response => {
        let variable_transition:any = response;
        this.menus = variable_transition.menus;
        this.menus.forEach(
          (element: any) => {
             element.direccion_url ="/intranet/"+ element.controlador;
          }
        );
        this.log("Menu",this.menus);
        return response;
      }),
      catchError(error => {
      
        //this.username = '';
      if(error.status == 401){
        this.usuario.cerrarSesion();
        
      }
        return throwError(error);
      })
    );
  }

  public setPaginaActual(paginaActual:any){
    this.paginaActual = paginaActual;
  }
  
  
}
