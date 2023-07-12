import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IFormConfig } from '../../formularios/form_Config';
import { FormControl } from '@angular/forms';
import { Configuracion_Autocompletar } from '../../inputs/modelos/clases/configuracion_autocompletar';


@Component({
  selector: 'super-tabla',
  templateUrl: './super-tabla.component.html',
  styleUrls: ['./super-tabla.component.css']
})
export class SuperTablaComponent implements OnInit,OnChanges {
  ngOnInit(): void {
    let typeOfData = typeof this.data[0];
    
    switch (typeOfData) {
      case "object":
        this.headerArray = this.headers;
        break;
    
      default:
        break;
    }
    if(length >0){
      this.config.canEdit = true;
      for (let index = 0; index < this.configFormEdit.length; index++) {
      
        this.arrayControlForm.push( new FormControl());
        this.cargadoData = true;
      }
    } else{
      this.config.canEdit = false;
    }
    
  }

  cargadoData:boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    let length:number = this.configFormEdit.length;
    if(this.cargadoData === false && this.data.length > 0) {
      let typeOfData = typeof this.data[0];
    
      switch (typeOfData) {
        case "object":
          this.headerArray = this.headers;
          break;
      
        default:
          break;
      }
      if(length >0){
        this.config.canEdit = true;
        for (let index = 0; index < this.configFormEdit.length; index++) {
          const element = this.configFormEdit[index];
          const da = this.data[index];
         
          this.arrayControlForm.push( new FormControl(da[element.form_control_name]));
          this.cargadoData = true;
        }
      } else{
        this.config.canEdit = false;
      }
    }
    
  }
  
  @Input() data: any[] = [];
  @Input() config:SuperTableConfig = {
    canDelete: true,
    canEdit: true
  };
  @Input() headerArray: any[] = [];
  @Input() configFormEdit: IFormConfig[] = [];
  arrayControlForm:FormControl[] = [];
  @Output() deleteClick = new EventEmitter();
  @Output() saveClick = new EventEmitter()
  // Obtiene las claves de los objetos como los encabezados de la tabla
  get headers(): string[] {
    return this.data.length > 0 ? Object.keys(this.data[0]) : [];
  }
  configAutocomplete:Configuracion_Autocompletar={
    campo_mostrar: {
      nombre_campo: "",
      nombre_tabla: ""
    },
    nombre_visible: "",
    nombre_campo: '',
    tipo_input: ''
  };
  conditionInput(i: number): boolean {
    try {
      return typeof this.configFormEdit[i].placeholder !== 'undefined' &&  typeof this.configFormEdit[i].type !== 'undefined';
    } catch (error) {
      return false;
    }
  }

  conditionAutocompletar(i: number): boolean {
    try {
      return typeof this.configFormEdit[i].config_autocomplete !== 'undefined';
    } catch (error) {
      return false;
    }
  }
  deleteEmit(row: any): void {
    this.deleteClick.emit(row);
  }

  antiguoEditable:number = 0;
  editarClicked(i:number): void {
    this.data[this.antiguoEditable].editable = false;

    let element = this.data[i];
    element.editable = true;
    for(let j = 0; j < this.arrayControlForm.length; j++){
      this.arrayControlForm[j].setValue(this.data[i][this.configFormEdit[j].form_control_name]);
    }
    this.antiguoEditable = i;
  }

  cancelEditClicked(i:number): void {
    let element = this.data[i];
    element.editable = false;
  }

  saveButtonClicked(i:number): void{
    
    let element = this.data[i];
    for (let index = 0; index < this.arrayControlForm.length; index++) {
      const controlForm = this.arrayControlForm[index];
      const configForm = this.configFormEdit[index].form_control_name;
      this.data[i][configForm] = controlForm.getRawValue();
    }
    this.saveClick.emit(element);
    
    element.editable = false;
  }

  trackByClave(index: number, clave: string): any {
    // Devuelve la clave como valor único
    return clave;
  }
  trackByIndex(index: number, item: any): any {
    // Devuelve un valor único para cada elemento
    return index;
  }
}
 export interface SuperTableConfig{
  canDelete: boolean,
  canEdit: boolean
 }
 
