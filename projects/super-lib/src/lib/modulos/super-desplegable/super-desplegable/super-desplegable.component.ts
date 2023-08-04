import { Component, Input, OnInit } from '@angular/core';
import { ICabezeraDesplegableConfig, ISuperDesplegableComponenteInternoConfig, ISuperDesplegableConfig, ISuperTableDesplegableConfig } from './model/IDesplegableConfig';

@Component({
  selector: 'super-desplegable',
  templateUrl: './super-desplegable.component.html',
  styleUrls: ['./super-desplegable.component.scss'],
})
export class SuperDesplegableComponent  implements OnInit {

  @Input() public config: ISuperDesplegableConfig={
    collapsed: true,
    componente_interno:{
     
      type:""
    },
    headersDesplegable:[]
  };
  
  @Input() public configDesplegable:ISuperDesplegableConfig[]=[];
  @Input() public profundidad: number = 0;
  public profundidadMaxima:number = 2;
  constructor() { }
  public list : any[]=[];
  private cargadoDatos:boolean = false;

  ngOnInit() {

    if(this.cargadoDatos === false){

      if(typeof this.config.componente_interno.config_desplegable !== "undefined" && this.config.componente_interno.config_desplegable.length>0){
        this.list=this.config.componente_interno.config_desplegable;
        this.cargadoDatos=true;
      }
    }
    
    
  }
  isSuperDesplegableConfigArray(obj: ISuperDesplegableConfig[] | ISuperTableDesplegableConfig): obj is ISuperDesplegableConfig[] {
    return Array.isArray(obj) && obj.every(item => 'headersDesplegable' in item);
  }

}

 export class SuperDesplegableConfig implements ISuperDesplegableConfig{
  
  constructor(
    public headersDesplegable: ICabezeraDesplegableConfig[],
    public componente_interno: SuperDesplegableComponenteInternoConfig,
    public collapsed: boolean
  ){}
  
}

export class SuperDesplegableComponenteInternoConfig implements ISuperDesplegableComponenteInternoConfig{
  constructor(
    public   type: string,
    public config_component: SuperDesplegableConfig[] | ISuperTableDesplegableConfig
  ){

  }

}