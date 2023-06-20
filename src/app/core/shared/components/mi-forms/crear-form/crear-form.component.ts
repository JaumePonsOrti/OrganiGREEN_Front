import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Configuracion_Input } from '../../../models/config_input';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-crear-form',
  templateUrl: './crear-form.component.html',
  styleUrls: ['./crear-form.component.scss'],
})
export class CrearFormComponent  implements OnChanges {
  @Input() public  config: Configuracion_Input[] = [
    {
      nombre_campo:"usuario_email",
      nombre_visible:"Email",
      tipo_input:"text",
    },
    {
      nombre_campo:"usuario_medida_id",
      nombre_visible:"Unidad de medida",
      tipo_input:"text",
      campo_referenciado:{
        nombre_campo:"medida_id",
        nombre_tabla:"unidad_medida",
      }, 
      campo_mostrar:{
        nombre_campo:"medida_nombre",
        nombre_tabla:"unidad_medida",
      }
    }
  ];
  @Input() public  referenciados: any = {
    medida_id:[
      {
        "medida_id":0,
        "medida_nombe":"hectareas"
      },
      {
        "medida_id":2,
        "medida_nombe":"metros"
      }
    ]
  };

  
  @Output() submited = new EventEmitter<any>();
  cargadoForm: boolean = false;
  public form = new FormGroup({});
  
  public keyFieldsArray: any[] = [];
  public valueFieldsArray: any[] = [];
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Entrando en oNCHANGE, el length de fields es: ",this.config.length);
    if( this.cargadoForm === false ){
      
      for (let index = 0; index <this.config.length; index++) {
        const element = this.config[index];
        this.form.addControl(element.nombre_campo, new FormControl(''));
        this.cargadoForm = true;
      }
      
      console.log("MODIFICADO CARGADOFORM: "+this.cargadoForm);
    }
    
  }
  
  ejecutar(){ 
    let devolver:any = {};
    /*for (let index = 0; index < Object.keys(this.fields).length; index++) {
      const key = Object.keys(this.fields)[index];
      const value = Object.values(this.fields)[index];
      devolver[key] = this.form.get(key)?.getRawValue();
    }*/
    console.log("devolver: ",devolver);
    this.submited.emit(devolver);
    console.log("EMITIDO, MODIFICADO CARGADOFORM: ", devolver);

  }

}
