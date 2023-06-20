import { Campo_Referenciado } from "./campo_referenciado";

export interface Configuracion_Input2 {
    nombre_campo:string;
    nombre_visible:string;
    tipo_input:string;
    campo_referenciado: Campo_Referenciado;
    campo_mostrar: Campo_Referenciado;
}