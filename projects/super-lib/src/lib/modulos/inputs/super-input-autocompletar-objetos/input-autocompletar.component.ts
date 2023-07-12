import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Configuracion_Autocompletar } from '../modelos/clases/configuracion_autocompletar';

@Component({
  selector: 'super-input-autocompletar-objetos',
  templateUrl: './input-autocompletar.component.html',
  styleUrls: ['./input-autocompletar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputAutocompletarComponent,
      multi: true
    }
  ]
})
export class InputAutocompletarComponent  implements OnInit, ControlValueAccessor {
  form: FormControl = new FormControl();
  filtreredObject!:  Observable<any[]>;
  campoMostrar !:any;
  objetoSelecionado: any;
  @Input() public  config: Configuracion_Autocompletar={
    campo_mostrar: {
      nombre_campo: "",
      nombre_tabla: ""
    },
    nombre_visible: "",
    nombre_campo: '',
    tipo_input: ''
  };
  @Input() public  referenciados: any;

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
         
        }
        return this._normalizeValue(referenciado[mostrar_autocompletar]).includes(filterValue);
      }
    );
    console.log("FILTRADO:",filtered);
    return filtered;
  }

  onClick(){
    if (typeof this.config.campo_referenciado !== "undefined") {
      this.onChange(JSON.stringify(this.objetoSelecionado[this.config.campo_referenciado.nombre_campo]));
    }
    else{
      this.onChange(JSON.stringify(this.objetoSelecionado));
    }
  }

  private _normalizeValue(value: string): string {
    if (typeof value === "string") {
      return value.toLowerCase().replace(/\s/g, '');
    };
    return "";
  }

}

