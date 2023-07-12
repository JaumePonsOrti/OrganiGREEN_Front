import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFormConfig } from '../form_Config';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'super-inline-form',
  templateUrl: './inline-form.component.html',
  styleUrls: ['./inline-form.component.css']
})
export class InlineFormComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  @Output() submited: EventEmitter<any> = new EventEmitter<any>();

  @Input() config:IFormConfig[] = [
    {
      form_control_name:"Cliente_d",
      type: 'number',
      placeholder:"Id (No se puede modificar)",
      disabled: false,
    },
    {
      form_control_name:"unidad_medida_id",
      config_autocomplete:{
        nombre_campo:"usuario_medida_id",
        nombre_visible:"Autocompletar con lista de objetos ",
        tipo_input:"text",
        campo_referenciado:
        {
          nombre_campo:"medida_id",
          nombre_tabla:"unidad_medida",
        },
        campo_mostrar:
        {
          nombre_campo:"medida_nombre",
          nombre_tabla:"unidad_medida",
        }
      }, 
      resources_autocomplete:[
        {
          "medida_id":0,
          "medida_nombre":"hectareas"
        },
        {
          "medida_id":2,
          "medida_nombre":"metros"
        }
      ],
      disabled:false, 
      placeholder:""

    }
  ];
  ngOnInit(): void {
    for (let index = 0; index < this.config.length; index++) {
      const element = this.config[index];
      let type =  element.type ?? element.config_autocomplete?.tipo_input??"";
      switch (type) {
        case "text":
          this.formGroup.addControl(element.form_control_name,new FormControl(""));
          break;
        case "number":
          this.formGroup.addControl(element.form_control_name,new FormControl(Number()));
        break;
        default:
          this.formGroup.addControl(element.form_control_name,new FormControl(""));

          break;
      }
     
      
    }
  }

  onSubmit(){
   
    //console.log(this.formGroup.value);
   
    this.submited.emit(this.formGroup.value);
  }



}

