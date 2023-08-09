import { ICampo_Referenciado } from "../../inputs/modelos/interfaces/ICampo_Referenciado";
import { IConfiguracion_Input } from "../../inputs/modelos/interfaces/IConfiguracion_Input";

export class Config_Search  implements IConfiguracion_Input{
    constructor(
        public nombre_campo: string,
        public nombre_visible: string,
        public tipo_input:string,
        public campo_mostrar: ICampo_Referenciado,
        public search_type?:string
    ) {
        
    }
}