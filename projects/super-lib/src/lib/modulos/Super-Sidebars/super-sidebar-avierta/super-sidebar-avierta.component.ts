import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Enlace_Menu } from '../../menus/models/enlace_menu';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Configuracion_Autocompletar } from '../../inputs/modelos/clases/configuracion_autocompletar';
import { Observable, Subscriber, map, pipe, startWith } from 'rxjs';
import { Config_Search } from '../../busquedas/models/Config_Search';
import { SuperSidebarService } from '../../../servicios/super-sidebar.service';

@Component({
  selector: 'super-sidebar-avierta',
  templateUrl: './super-sidebar-avierta.component.html',
  styleUrls: ['./super-sidebar-avierta.component.scss']
})
export class SuperSidebarAviertaComponent implements OnInit,OnChanges {
  constructor(public sidebarService: SuperSidebarService){
  }
  iniciado: boolean = false;
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ENLACES:", this.enlaces);
    if(this.iniciado === false){
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

  ngOnInit(): void {
    
   
    
  }

  searchClicked(): void {
    if(this.formControl.getRawValue()!==""){
      this.enlace_menu_resultantes = this.provisonal_enlace_var;
    }
    
  }
  provisonal_enlace_var!:Observable<Enlace_Menu[]>;
  enlace_menu_resultantes: Observable<Enlace_Menu[]> = new Observable<Enlace_Menu[]>((subscriber)=> {
    subscriber.next(this.enlaces);
  });
  @Input() config!: ConfigSidebar;
  @Input() enlaces: Enlace_Menu[] = [];
  @Input () enlaces_perfil!:  Enlace_Menu[];
  @Output() singOutClick: EventEmitter<any> = new EventEmitter();
 
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
  singOut(){
    this.singOutClick.emit("");
  }
  
}

export interface ConfigSidebar {
  tipo: string;
  tema: string;
  usuario?: User;
  barraBusqueda?: Config_Search;
}

export interface User{
  nombre_usuario: string;
    imagen_usuario: string;
}