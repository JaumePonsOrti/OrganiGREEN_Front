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

 //Inputs y Outpust
  @Input() data: any[] = [];
  @Input() config:SuperTableConfig = {
    canDelete: false,
    canEdit: false
  };
  @Input() headerArray: any[] = [];
  @Input() configFormEdit: IFormConfig[] = [];
  @Output() deleteClick = new EventEmitter();
  @Output() saveClick = new EventEmitter()
  @Output() personalizatedButtonClicked = new EventEmitter();

  //Variables
  cargadoData:boolean = false;
  arrayControlForm:FormControl[] = [];

  //NgOnInit
  ngOnInit(): void {
    let typeOfData = typeof this.data[0];
    switch (typeOfData) {
      case "object":
        if(this.headerArray.length === 0){
          this.headerArray = this.headers;

        }
        break;
    
      default:
        break;
    }
    
    if(length >0){
      this.config.canEdit = true;
      for (let index = 0; index < this.configFormEdit.length; index++) {
      
        this.arrayControlForm.push( new FormControl(""));
        this.cargadoData = true;
      }
    }/* else{
      this.config.canEdit = false;
    }*/
    
  }

  //NgOnChange
  ngOnChanges(changes: SimpleChanges): void {
    let length:number = this.configFormEdit.length;
    
    
    try {
      if(this.cargadoData === false && this.data.length > 0) {
        this.config.buttonPersonalized = this.config.buttonPersonalized ?? [];
        let typeOfData = typeof this.data[0];
        switch (typeOfData) {
          case "object":
            if(this.headerArray.length === 0){
              this.headerArray = this.headers;

            }
            break;
        
          default:
            break;
        }
        if(length >0){
          this.config.canEdit = true;
          for (let index = 0; index < this.configFormEdit.length; index++) {
            const element = this.configFormEdit[index];
            const da = this.data[index];
            console.log(da);
            try {
              this.arrayControlForm.push( new FormControl(da[element.form_control_name]));
            } catch (error) {
              this.arrayControlForm.push( new FormControl());
            }
            
            this.cargadoData = true;
          }
        } else {
          this.config.canEdit = false;
        }
        this.data.forEach(element => {
          if(!element["editable"] )
           element["editable"] = false;
        });
      }
    } catch (error) {
      
    }
    if(typeof changes["data"].previousValue !=="undefined" && typeof changes["data"].currentValue !== "undefined" && changes["data"].previousValue.length !== changes["data"].currentValue.length ){
      this.headerArray = this.headerArray;
     // alert("Cambia en tabla al cargar");
    }
    
  }
  
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
  deleteEmit(row: any, i:number): void {
    let d={object:this.trimPassedData(row),i:i}
    this.deleteClick.emit(d);
    
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
      const configForm = this.configFormEdit[index];
      element[configForm.form_control_name] = controlForm.getRawValue();
      //alert(configForm.form_control_name+": "+controlForm.getRawValue());
      if(configForm.type === "number"){
        element[configForm.form_control_name] = new Number( controlForm.getRawValue());
      }
      
    } 
    console.log("ELEMENTO GUARDADO: ",element);
    this.saveClick.emit(this.trimPassedData(element));
    
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

  trimPassedData(object: any): any {
    let object2 = Object.assign({}, object);
    delete object2["editable"];
    return object2;
  };

  butPerClicked(arg0: string,row:any) {
    this.personalizatedButtonClicked.emit({intern_name:arg0, row: row});
  }
}

 export interface SuperTableConfig{
  canDelete: boolean,
  canEdit: boolean,
  buttonPersonalized?: PersonalizedButton[]
 }

 export interface PersonalizedButton{
  name: string,
  intern_name: string,
  icon?: string,
  class?: string,
  color?: string,
 }
 
