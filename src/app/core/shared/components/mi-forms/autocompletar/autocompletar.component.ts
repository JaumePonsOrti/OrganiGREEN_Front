import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Configuracion_Input } from '../../../models/Config_input';

@Component({
  selector: 'app-autocompletar',
  templateUrl: './autocompletar.component.html',
  styleUrls: ['./autocompletar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutocompletarComponent,
      multi: true
    }
  ]
})
export class AutocompletarComponent  implements OnInit, ControlValueAccessor {
  form: FormControl = new FormControl();
  filtreredObject!:  Observable<any[]>;
  campoMostrar !:any;
  objetoSelecionado: any;
  @Input() public  config: Configuracion_Input = 
    {
      nombre_campo:"usuario_medida_id",
      nombre_visible:"Nombre unidad de medida",
      tipo_input:"text",
      campo_referenciado:{
        nombre_campo:"medida_id",
        nombre_tabla:"unidad_medida",
      }, 
      campo_mostrar:{
        nombre_campo:"medida_nombre",
        nombre_tabla:"unidad_medida",
      }, 
      autocompletar: true
    };
  @Input() public  referenciados: any = [
      {
        "medida_id":0,
        "medida_nombre":"hectareas"
      },
      {
        "medida_id":2,
        "medida_nombre":"metros"
      }
    ]
  ;

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
    this.filtreredObject = 
    this.form.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): any[] {
    const filterValue = this._normalizeValue(value);
    let filtered:any[] = [];
    const mostrar_autocompletar = this.config.campo_mostrar.nombre_campo ;
    filtered = this.referenciados.filter(
      (referenciado: any) =>  {
        const condicion = this._normalizeValue(referenciado[mostrar_autocompletar]).includes(filterValue);
        if (condicion){
          this.objetoSelecionado = referenciado;
          this.onChange(referenciado);
        }
        return this._normalizeValue(referenciado[mostrar_autocompletar]).includes(filterValue);
      }
    );
    console.log("FILTRADO:",filtered);
    return filtered;
  }

  private _normalizeValue(value: string): string {
    if (typeof value === "string") {
      return value.toLowerCase().replace(/\s/g, '');
    };
    return "";
  }

}
