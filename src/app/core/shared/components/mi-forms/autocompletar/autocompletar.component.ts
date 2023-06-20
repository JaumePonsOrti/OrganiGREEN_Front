import { Component, Input, OnInit } from '@angular/core';
import { Configuracion_Input } from '../../../models/config_input';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Configuracion_Input2 } from '../../../models/Config_input2';

@Component({
  selector: 'app-autocompletar',
  templateUrl: './autocompletar.component.html',
  styleUrls: ['./autocompletar.component.scss'],
})
export class AutocompletarComponent  implements OnInit {
  form: FormControl = new FormControl();
  filtreredObject!:  Observable<any[]>;
  campoMostrar !:any;
  objetoSelecionado: any;
  @Input() public  config: Configuracion_Input2 = 
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
      }
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

  private _normalizeValue(value: string): string {
    if (typeof value === "string") {
      return value.toLowerCase().replace(/\s/g, '');
    };
    return "";
  }

}
