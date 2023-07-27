import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFormConfig } from 'projects/super-lib/src/lib/modulos/formularios/form_Config';
import { SuperTableConfig } from 'projects/super-lib/src/lib/modulos/tablas/super-tabla/super-tabla.component';
import { HashService } from 'src/app/core/shared/services/crytp/hash.service';
import { MenuService } from 'src/app/core/shared/services/menu/menu.service';
import { UniversalService } from 'src/app/core/shared/services/universal/universal.service';
import { UsuariosService } from 'src/app/core/shared/services/usuarios/usuarios.service';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.scss'],
})
export class PlanificacionComponent  implements OnInit {

 
  config: SuperTableConfig = {
    canDelete: true,
    canEdit: true,
  };
  can_ver!: boolean;
  can_agregar!: boolean;
  
  constructor(
    public rutaActiva: ActivatedRoute,
    private universalService:UniversalService, 
    private hasService: HashService,
    private _modalService:NgbModal, 
    public menuService: MenuService,
    public router:Router, 
    public usuario:UsuariosService
  ) { }
  public listaContenidos:any = [];
  public nombreControlador:string = "planificacion";
  arrayEstados:any[] = [
    {
      id:0,
      nombre:"Por hacer"
    },
    {
      id:1,
      nombre:"En proceso",
    },
    { 
      id:2,
      nombre:"Realizado",
    },
    {
      id:3,
      nombre:"Facturado "
    },
    {
      id:4,
      nombre:"Cobrado :)p "
    }
  ];

  config_form:IFormConfig[] = [
    {
      type:"number",
      placeholder: "ID (no se puede modificar)",
      form_control_name: this.nombreControlador+"_id",
      disabled: true
    },
    {
      type:"number",
      placeholder:"Nombre Campo",
      form_control_name:"planificacion_id_campo",
      disabled:false,
      /*config_autocomplete:{
        tipo_input:"text",
        campo_mostrar:{
          nombre_campo:"medida_nombre",
          nombre_tabla:"medida",
        },
        campo_referenciado:{
          nombre_campo:"medida_id",
          nombre_tabla:"medida",
        },
        nombre_campo:"medida_id",
        nombre_visible:"Nombre medida"
      },*/
    },
    {
      type:"text",
      placeholder:"Fecha realizacion",
      form_control_name:"planificacion_fecha_realizar", 
      disabled:false
    },
    {
      type:"number",
      form_control_name:"planificacion_estado", 
      config_autocomplete:{
        tipo_input:"text",
        campo_mostrar:{
          nombre_campo:"nombre",
          nombre_tabla:"medida",
        },
        campo_referenciado:{
          nombre_campo:"id",
          nombre_tabla:"medida",
        },
        nombre_campo:"id",
        nombre_visible:"Estado "
      },
      resources_autocomplete: this.arrayEstados,
      disabled:false
    }
  ];
  ngOnInit() {
  
    this.universalService.request( 
      this.nombreControlador,"ver", "todos").subscribe(
      {
        next: (response: any) => {
          this.listaContenidos = response;
        
          for (let index = 0; index < response.length; index++) {
            let element = response[index];
            delete element["planificacion_timestamp_inicio"];
            delete element[this.nombreControlador+"_timestamp_final"];
            element["planificacion_estado"] =  this.arrayEstados[element["planificacion_estado"]].nombre;
            
          }
          console.log("Lista Contenidos: ",this.listaContenidos);
        },
        error: (error:any) => {
        },
      }
    );
   /*this.universalService.request(
      "unidad_medida","ver", "todos").subscribe(
      {
      next: (response:any) =>
        {
          console.log("Lista medidas: ",this.listaContenidos);
          this.config_form[].resources_autocomplete = response;
        }

      }
    );
    */
    
  }
   calcularDiferenciaFechas(fechaInicio:string, fechaFin:string) {
    const fechaInicioCon = new Date('2023-07-26T12:00:00').getTime();
    const fechaFinCon = new Date('2023-07-26T15:30:45').getTime();
    const diffEnMilisegundos = fechaFinCon - fechaInicioCon;
    if (diffEnMilisegundos < 0) {
      throw new Error("La fecha de inicio debe ser anterior a la fecha de fin.");
    }
  
    const segundos = Math.floor(diffEnMilisegundos / 1000) % 60;
    const minutos = Math.floor(diffEnMilisegundos / (1000 * 60)) % 60;
    const horas = Math.floor(diffEnMilisegundos / (1000 * 60 * 60));
  
    return {
      horas,
      minutos,
      segundos,
    };
  }
  

}
