import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFormConfig } from 'projects/super-lib/src/lib/modulos/formularios/form_Config';
import { UniversalService } from 'src/app/core/shared/services/universal/universal.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent  implements OnInit {

  constructor(public rutaActiva: ActivatedRoute, private universalService:UniversalService) { }
  public listaContenidos:any = [];
  public nombreControlador:string = "cliente";
  ngOnInit() {
    this.universalService.request( 
      this.nombreControlador,"ver", "todos").subscribe(
      {
        next: (response) => {
          this.listaContenidos = response;

          for (let index = 0; index < this.listaContenidos.length; index++) {
            const element = this.listaContenidos[index];

            if(this.nombreControlador === "usuario"){
              element["usuario_contrasenya"] = "";
            }
            element["editable"] = false;
            this.listaContenidos[index] = element;
          }
          console.log("Lista Contenidos: ",this.listaContenidos);
  
         
        },
        error: (error) => {
        },
      }
    );
  }
  config_form:IFormConfig[] = [
    {
      type:"number",
      placeholder: "ID (no se puede modificar)",
      form_control_name:"id"
    },
    {
      type:"string",
      placeholder:"Nombre",
      form_control_name:"cliente_nombre"
    },
    {
      type:"string",
      placeholder:"Mote",
      form_control_name:"cliente_mote"
    }
  ];

}
