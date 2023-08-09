import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { ISuperDesplegableConfig } from 'projects/super-lib/src/lib/modulos/super-desplegable/super-desplegable/model/IDesplegableConfig';
import { MenuService } from '../../services/menu/menu.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-desplegable',
  templateUrl: './desplegable.component.html',
  styleUrls: ['./desplegable.component.scss'],
})
export class DesplegableComponent  implements OnInit, OnChanges {

  public formControl: FormControl = new FormControl();
  @Input() configs: ISuperDesplegableConfig[] = [];
  @Output() private clickCerrarSesion: EventEmitter<any> = new EventEmitter();
  constructor(
      public menuService:MenuService,
  ) { }
  public configsAgrupados:any = {}; 
  public indiceFiltro:string ="";
  private cargado:boolean = false;


  ngOnChanges(changes: SimpleChanges): void {
    if(changes["configs"].currentValue !== undefined && this.cargado === false){
      let date = new Date();
      
      for (let index = 0; index < this.configs.length; index++) {
        const element = this.configs[index];
        console.log("ELEMENT",element);
        if(typeof element.dato_por_el_que_filtrar !== "undefined"){
          
          if(this.configsAgrupados[element.dato_por_el_que_filtrar] === undefined){
            this.configsAgrupados[element.dato_por_el_que_filtrar] = [];
          }
          this.configsAgrupados[element.dato_por_el_que_filtrar].push(element);
        }
        this.cargado = true;
        let date2 = new Date(date.getFullYear() + "-"+(date.getMonth()+1 )+ "-"+date.getDate()+ " 00:00:00:UTC").toJSON();
        this.indiceFiltro = date2;
        console.log("AGRUPADOS:", this.configsAgrupados);
        console.log(this.indiceFiltro);
      } 
      this.formControl.valueChanges.subscribe({
        next:(date:any) =>{
          //alert(e);       
          
          this.indiceFiltro = new Date(date).toJSON()??"";
        }
      });

    }
  }
  
 
  ngOnInit() {
    
  }
  
  agrupar(){
    for (let index = 0; index < this.configs.length; index++) {
      const element = this.configs[index];
      if(element.dato_por_el_que_filtrar !== undefined){
        if( this.configsAgrupados[element.dato_por_el_que_filtrar]!== undefined){
          this.configsAgrupados[element.dato_por_el_que_filtrar] = [];
        }
        this.configsAgrupados[element.dato_por_el_que_filtrar].push(element);
      }
      
    } 
  }
  cerrarSesion() { 
    this.clickCerrarSesion.emit();
  }
}

