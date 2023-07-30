import { IFormConfig } from "projects/super-lib/src/lib/modulos/formularios/form_Config";
import { SuperTableConfig } from "projects/super-lib/src/lib/modulos/tablas/super-tabla/super-tabla.component";

export interface ICrudConfig{
    can_ver: boolean,
    can_agregar: boolean,  
    can_dataPicker: boolean,
    config_super_table: SuperTableConfig,
    config_super_form?: IFormConfig, 
    campo_por_el_que_agrupar?:{
        nombre_campo:string,
        nombre_controler:string
    },
    devolver_objeto_modificado?:boolean,
    objeto_referencia?:any
     //can_menu_superior: boolean,
}