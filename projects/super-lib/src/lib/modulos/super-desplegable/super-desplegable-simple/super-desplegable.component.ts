import { Component, Input, OnInit } from '@angular/core';
import { ISuperDesplegableConfig, ISuperTableDesplegableConfig } from '../super-desplegable/model/IDesplegableConfig';

@Component({
  selector: 'super-desplegable-simple',
  templateUrl: './super-desplegable.component.html',
  styleUrls: ['./super-desplegable.component.scss'],
})
export class SuperDesplegableSimpleComponent  implements OnInit {

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
  ngOnInit() {
    if(typeof this.config.componente_interno.config_desplegable !== "undefined"){
    
      this.list=this.config.componente_interno.config_desplegable;
    }
    
  }
  isSuperDesplegableConfigArray(obj: ISuperDesplegableConfig[] | ISuperTableDesplegableConfig): obj is ISuperDesplegableConfig[] {
    return Array.isArray(obj) && obj.every(item => 'headersDesplegable' in item);
  }
}
