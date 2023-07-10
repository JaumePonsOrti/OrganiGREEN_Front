import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IFormConfig } from '../../formularios/form_Config';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'super-tabla',
  templateUrl: './super-tabla.component.html',
  styleUrls: ['./super-tabla.component.css']
})
export class SuperTablaComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    let typeOfData = typeof this.data[0];
    
    switch (typeOfData) {
      case "object":
        this.headerArray = this.headers;
        break;
     
      default:
        break;
    }
    let length:number = this.configFormEdit.length;
    switch(length){
      case 0:
        this.config.canEdit = false;
        break;
      case 1 || length>1:
        this.config.canEdit = true;
        for (let index = 0; index < this.configFormEdit.length; index++) {
          const element = this.configFormEdit[index];
          const da = this.data[index];
           this.arrayControlForm[index] = new FormControl(da[index][element.form_control_name]);
        }
        break;
      
    }
    
  }
  ngOnInit(): void {
    
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

  deleteEmit($event: any): void {
    this.deleteClicked.emit($event);
  }
  
  editarClicked(i:number): void {
    this.data[i].editable = !this.data[i].editable;
  }
  editarEmit($event: Event): void {
  }
  guardarEditarEmit($event: any): void{
    this.deleteClicked.emit($event);
  }
}
 export interface SuperTableConfig{
  canDelete: boolean,
  canEdit: boolean
 }
