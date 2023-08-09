import { Component, Input, OnInit } from '@angular/core';

import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Configuracion_Autocompletar } from '../inputs/modelos/clases/configuracion_autocompletar';
import { Config_Search } from './models/Config_Search';
@Component({
  selector: 'super-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: BusquedasComponent,
      multi: true
    }
  ]
})
export class BusquedasComponent implements OnInit, ControlValueAccessor {
  form: FormControl = new FormControl();
  filtreredObject!:  Observable<any[]>;
  campoMostrar !:any;
  objetoSelecionado: any;
  @Input() public  config!: Config_Search;
  @Input() public  object_list: any[] = [];

  constructor() { }
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.form.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  ngOnInit() {
    console.log("start on init on searchComponent");
    this.onChange(JSON.stringify(this.object_list));
    this.form.valueChanges.subscribe((value: any) => {
      const filterValue = this._normalizeValue(value);
      const mostrar_autocompletar = this.config.campo_mostrar.nombre_campo ;
      const filteredValue = this.object_list.filter( (referenciado:any) =>
        this._normalizeValue(referenciado[mostrar_autocompletar]).includes(filterValue)
      );
      //console.log("Valor filtrado:",filteredValue);
      this.onChange(JSON.stringify(filteredValue));
    });
    
  }

  private _normalizeValue(value: string): string {
    if (typeof value === "string") {
      return value.toLowerCase().replace(/\s/g, '');
    };
    return "";
  }

}


