import { SuperTableConfig } from "../../../tablas/super-tabla/super-tabla.component";

export interface ISuperDesplegableConfig{
    headersDesplegable:ICabezeraDesplegableConfig[];
    componente_interno:ISuperDesplegableComponenteInternoConfig;
    collapsed:boolean;
}
/*
El nombre del campo se puede omitir
*/
export interface ICabezeraDesplegableConfig{
    dato_mostrado:string;
    nombre_campo?:string;
}

export interface ISuperDesplegableComponenteInternoConfig{
    type:string;
    config_component:ISuperDesplegableConfig | ISuperTableDesplegableConfig;
}

export interface ISuperTableDesplegableConfig{
    headersArrayTable: string[];
    configTable: SuperTableConfig;
    listaContenidos: any[]; 
}