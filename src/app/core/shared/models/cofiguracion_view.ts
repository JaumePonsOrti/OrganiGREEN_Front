import { Configuracion_Input } from "./Config_input";


export interface Configuracion_View {
  crear: Configuracion_Input[];
  editar: Configuracion_Input[];
  borrar: any[];
}
