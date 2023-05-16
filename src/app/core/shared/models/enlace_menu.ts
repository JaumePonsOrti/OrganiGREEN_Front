import { Configuracion_View } from "./cofiguracion_view";

export class Enlace_Menu {
  /**
   *
   */
  constructor(
    nombre_del_campo: string,
    tipo_de_view: string,
    controlador: string,
    icon?:string,
    configuracion_view?: Configuracion_View
  ) {
    this.nombre_del_campo = nombre_del_campo;
    this.tipo_de_view = tipo_de_view;
    this.controlador = controlador;
    this.icono = icon??"";
    if (typeof configuracion_view != "undefined") {
      this.configuracion_view = configuracion_view;
    }

  }

 
  nombre_del_campo: string;
  tipo_de_view: string;
  controlador: string;
  icono:string = "fa-tachometer-alt";
  configuracion_view!: Configuracion_View;
  sub_elementos!:Enlace_Menu[];
  clase_extra:string = "";
  //puede ser  menu-open
}
