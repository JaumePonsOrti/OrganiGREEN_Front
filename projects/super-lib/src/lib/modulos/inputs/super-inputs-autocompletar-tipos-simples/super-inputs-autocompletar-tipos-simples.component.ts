import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Configuracion_Autocompletar } from '../modelos/clases/configuracion_autocompletar';
import { IConfiguracion_Input } from '../modelos/interfaces/IConfiguracion_Input';
@Component({
  selector: 'super-inputs-autocompletar-tipos-simples',
  templateUrl: './super-inputs-autocompletar-tipos-simples.component.html',
  styleUrls: ['./super-inputs-autocompletar-tipos-simples.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SuperInputsAutocompletarTiposSimplesComponent,
      multi: true
    }
  ]
})
export class SuperInputsAutocompletarTiposSimplesComponent implements OnInit, ControlValueAccessor {
  form: FormControl = new FormControl();
  filtreredObject!:  Observable<any[]>;
  campoMostrar !:any;
  objetoSelecionado: any;
  @Input() public  config!: IConfiguracion_Input;
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
    
    
    filtered = this.referenciados.filter(
      (referenciado: any) =>  {
       
        this.objetoSelecionado = referenciado;
        return this._normalizeValue(referenciado).includes(filterValue);
      }
    );
    console.log("FILTRADO:",filtered);
    return filtered;
  }

  onClick(objeto: any): void {
    this.onChange(objeto);
  }

  private _normalizeValue(value: string): string {
    if (typeof value === "string") {
      return value.toLowerCase().replace(/\s/g, '');
    };
    return "";
  }
}
