
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Debug } from '../../../helpers/Debug';
import { Console } from 'console';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges {
  @Input() public  fields: any = {};
  @Output() submited = new EventEmitter<any>();
  cargadoForm: boolean = false;
  public form = new FormGroup({});
  
  public keyFieldsArray: any[] = [];
  public valueFieldsArray: any[] = [];
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Entrando en oNCHANGE, el length de fields es: ",Object.keys(this.fields).length);
    if( this.cargadoForm === false ){
      console.log("Entrando en el if del oNCHANGE, el length de fields es: ",Object.keys(this.fields).length);
      for (let index = 0; index < Object.keys(this.fields).length; index++) {
        const key = Object.keys(this.fields)[index];
        const value = Object.values(this.fields)[index];
        this.keyFieldsArray.push(key);
        this.valueFieldsArray.push(value);
        this.form.addControl(key, new FormControl(''));
        this.cargadoForm = true;
      }
      
      console.log("MODIFICADO CARGADOFORM: "+this.cargadoForm);
    }
    
  }
  
  ejecutar(){ 
    let devolver:any = {};
    for (let index = 0; index < Object.keys(this.fields).length; index++) {
      const key = Object.keys(this.fields)[index];
      const value = Object.values(this.fields)[index];
      devolver[key] = this.form.get(key)?.getRawValue();
    }
    console.log("devolver: ",devolver);
    this.submited.emit(devolver);
    console.log("EMITIDO, MODIFICADO CARGADOFORM: ", devolver);

  }
}