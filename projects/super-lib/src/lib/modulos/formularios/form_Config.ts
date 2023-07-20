import { Configuracion_Autocompletar } from "../inputs/modelos/clases/configuracion_autocompletar";

export interface IFormConfig{
    form_control_name: string;
    type?: string;
    placeholder?: string;
    config_autocomplete?: Configuracion_Autocompletar;
    resources_autocomplete?:any[];
    disabled: boolean;
}