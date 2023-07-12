import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IFormConfig } from '../../formularios/form_Config';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'super-tabla',
  templateUrl: './super-tabla.component.html',
  styleUrls: ['./super-tabla.component.css']
})
export class SuperTablaComponent implements OnInit,OnChanges {
  ngOnInit(): void {console.log("configFormEdit:",this.configFormEdit);
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
  @Output() deleteClicked = new EventEmitter()
  // Obtiene las claves de los objetos como los encabezados de la tabla
  get headers(): string[] {
    return this.data.length > 0 ? Object.keys(this.data[0]) : [];
  }

  conditionInput(i: number): boolean {
    console.log(this.configFormEdit[i]);
    return  typeof this.configFormEdit[i].placeholder !== 'undefined' &&  typeof this.configFormEdit[i].type !== 'undefined';
  }
  deleteEmit($event: any): void {
    this.deleteClicked.emit($event);
  }
  antiguoEditable:number = 0;
  editarClicked(i:number): void {
    this.data[this.antiguoEditable].editable = false;
    console.log("This antiguoEditable:"+ this.antiguoEditable+" I: " + i);
    let element = this.data[i];
    element.editable = !element.editable;
   
    for(let j = 0; j < this.arrayControlForm.length; j++){
      this.arrayControlForm[j].setValue( this.data[i][this.configFormEdit[j].form_control_name]);
    }
   
    this.antiguoEditable = i;
  }
  editarEmit($event: Event): void {
  }
  guardarEditarEmit($event: any): void{
    this.deleteClicked.emit($event);
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
 
