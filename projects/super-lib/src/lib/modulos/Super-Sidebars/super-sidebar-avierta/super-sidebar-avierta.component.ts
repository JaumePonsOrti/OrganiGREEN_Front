import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Enlace_Menu } from '../../menus/models/enlace_menu';
import { FormControl } from '@angular/forms';
import { Observable} from 'rxjs';
import { Config_Search } from '../../busquedas/models/Config_Search';
import { SuperSidebarService } from '../../../servicios/super-sidebar.service';
import { Usuario } from 'src/app/core/shared/models/usuario';

@Component({
  selector: 'super-sidebar-avierta',
  templateUrl: './super-sidebar-avierta.component.html',
  styleUrls: ['./super-sidebar-avierta.component.scss']
})
export class SuperSidebarAviertaComponent implements OnChanges {
  constructor(public sidebarService: SuperSidebarService){
  }

  @Input() config!: ConfigSidebar;
  @Input() enlaces: Enlace_Menu[] = [];
  @Input () enlaces_perfil!:  Enlace_Menu[];
  @Input() menuService!:any;
  @Output() singOutClick: EventEmitter<any> = new EventEmitter();
  @Input() user!:Usuario;

  iniciado: boolean = false;
  formControl: FormControl = new FormControl("");
  configBusquedas: Config_Search = 
  {
    nombre_campo:"enlaceMENU",
    nombre_visible:"Busqueda automatica ...",
    tipo_input:"text",
    campo_mostrar:{
      nombre_campo:"nombre_del_campo",
      nombre_tabla:"unidad_medida",
    },
    search_type: "simple_search"
  };
  
  provisonal_enlace_var!:Observable<Enlace_Menu[]>;
  enlace_menu_resultantes: Observable<Enlace_Menu[]> = new Observable<Enlace_Menu[]>((subscriber)=> {
    subscriber.next(this.enlaces);
  });
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ENLACES EN SIDEBAR", this.enlaces);
   
   
    if(this.iniciado === false && this.enlaces.length>0){
      console.log("ENLACES EN SIDEBAR", this.enlaces);
      this.formControl.valueChanges.subscribe(value => { 
        let asignable = JSON.parse(value)
        console.log("Parsed:",asignable);
        if (this.config.barraBusqueda?.tipo_input === "simple_search"){
          this.enlace_menu_resultantes = new Observable<Enlace_Menu[]>((subscriber)=> {
            subscriber.next(asignable);
          });
        }else{
          this.provisonal_enlace_var = new Observable<Enlace_Menu[]>((subscriber)=> {
            subscriber.next(asignable);
          });
        }
        if(value !== "" && asignable.length == this.enlaces.length){
          this.enlace_menu_resultantes = new Observable<Enlace_Menu[]>((subscriber)=> {
            subscriber.next(this.enlaces);
          });
        }
        this.iniciado = true;
        
      });
    }
  }

  searchClicked(): void {
    if(this.formControl.getRawValue()!==""){
      this.enlace_menu_resultantes = this.provisonal_enlace_var;
    }  
  }

 


 
  singOut(){
    this.singOutClick.emit("");
  }
  
}

export interface ConfigSidebar {
  tipo: string;
  tema: string;
  brandName: string;
  usuario?: User;
  barraBusqueda?: Config_Search;
  
}

export interface User{
  usuario_email: string;
    imagen_usuario: string;
}