import { Component, EventEmitter, Input, OnInit,Output } from '@angular/core';

interface ConfiguracionBusqueda {
  tipo: string;
  campos: CamposBusqueda[] | string[];
}

interface CamposBusqueda {
  nombre_visible: string;
  nombre_campo: string;
  nombre_tabla: string;
  autocompletado_remoto: boolean;
  OrigenValoresAutocompletado: OrigenValoresAutocompletado;
}

interface OrigenValoresAutocompletado {
  nombreCampos: string;
  nombreTabla: string;
  nombreCamposAMostrar: string[];
}
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent implements OnInit {
  constructor() { }

  ngOnInit() {}
  @Input() configuracionBusqueda!: ConfiguracionBusqueda;
  @Input() datos!: any[];
  @Output() datosFiltrados = new EventEmitter<any[]>();

  terminoBusqueda = '';
  valoresCampos: { [key: string]: string } = {};

  filtrarDatos() {
    let datosFiltrados = this.datos;
  
    if (this.terminoBusqueda) {
      datosFiltrados = datosFiltrados.filter((dato) =>
        dato.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    }
  
    if (Array.isArray(this.configuracionBusqueda.campos) && this.configuracionBusqueda.campos.length > 0 && typeof this.configuracionBusqueda.campos[0] === 'object') {
      for (const campo of this.configuracionBusqueda.campos as CamposBusqueda[]) {
        const valorCampo = this.valoresCampos[campo.nombre_campo];
        if (valorCampo) {
          datosFiltrados = datosFiltrados.filter((dato) =>
            dato[campo.nombre_campo].toLowerCase().includes(valorCampo.toLowerCase())
          );
        }
      }
    }
  
    this.datosFiltrados.emit(datosFiltrados);
  }
   
  get camposBusqueda(): CamposBusqueda[] | undefined {
    if (Array.isArray(this.configuracionBusqueda.campos) && this.configuracionBusqueda.campos.length > 0 && typeof this.configuracionBusqueda.campos[0] === 'object') {
      return this.configuracionBusqueda.campos as CamposBusqueda[];
    }
    return undefined;
  }

}
