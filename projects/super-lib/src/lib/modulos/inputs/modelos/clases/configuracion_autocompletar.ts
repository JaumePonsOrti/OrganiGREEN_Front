import { ICampo_Referenciado } from "../interfaces/ICampo_Referenciado";
import { IConfiguracion_Input } from "../interfaces/IConfiguracion_Input";

export class Configuracion_Autocompletar  implements IConfiguracion_Input{
    constructor(
        public nombre_campo: string, 
        public nombre_visible: string,
        public tipo_input:string,
        public campo_mostrar: ICampo_Referenciado,
        public campo_referenciado?: ICampo_Referenciado,
    ) {
        
    }
  
    
}