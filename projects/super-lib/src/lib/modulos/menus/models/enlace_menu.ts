

export class Enlace_Menu {
  
  /**
   *
   */
  constructor(
    nombre_del_campo: string,
    enlace:string,
    icon:string,
    controlador:string
  ) {
    this.nombre_del_campo = nombre_del_campo;
    this.direccion_url = enlace;
    this.icono = icon??"";
    this.controlador = controlador;
  }

  controlador: string;
  nombre_del_campo: string;
  direccion_url:string;
  icono:string = "fa-tachometer-alt";
  sub_elementos!:Enlace_Menu[];
  clase_extra!:string;
  //puede ser  menu-open
}
