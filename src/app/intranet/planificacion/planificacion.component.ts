import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFormConfig } from 'projects/super-lib/src/lib/modulos/formularios/form_Config';
import { ModalAutofocusComponent } from 'projects/super-lib/src/lib/modulos/modals/modal-autofocus/modal-autofocus.component';
import { ModalComponentComponent } from 'projects/super-lib/src/lib/modulos/modals/modal-crud/modal-component.component';
import { SuperTableConfig } from 'projects/super-lib/src/lib/modulos/tablas/super-tabla/super-tabla.component';
import { HashService } from 'src/app/core/shared/services/crytp/hash.service';
import { MenuService } from 'src/app/core/shared/services/menu/menu.service';
import { PlanificacionService } from 'src/app/core/shared/services/planificacion.service';
import { UniversalService } from 'src/app/core/shared/services/universal/universal.service';
import { UsuariosService } from 'src/app/core/shared/services/usuarios/usuarios.service';
import { ICrudConfig } from 'src/app/core/shared/views/new-crud/models/ICrudConfig';

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
    public usuario:UsuariosService,
    public planificacionService: PlanificacionService

  ) { }
  public listaContenidos:any = [];
  public nombreControlador:string = "planificacion";
  public headerArray:any[] = ["ID","Campo","Fecha realizacion","Estado","editable"];

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
      nombre:"Cobrado "
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
      form_control_name:"planificacion_id_campo",
      disabled:false,
      config_autocomplete:{
        tipo_input:"text",
        campo_mostrar:{
          nombre_campo:"campo_nombre",
          nombre_tabla:"campo",
        },
        campo_referenciado:{
          nombre_campo:"campo_id",
          nombre_tabla:"campo",
        },
        nombre_campo:"campo_id",
        nombre_visible:"Nombre campo"
      },
    },
    {
      type:"text",
      placeholder:"Fecha realizacion",
      super_input_type:'date-picker',
      form_control_name:"planificacion_fecha_realizar", 
      disabled:false
    },
    {
      type:"number",
      form_control_name:"planificacion_estado", 
      config_autocomplete:{
        tipo_input:"number",
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
  
  public crudConfig: ICrudConfig = {
    can_agregar:false,
    can_ver:false,
    can_dataPicker: true,
    config_super_table:{
      canDelete: false,
      canEdit: false,
      buttonPersonalized: [
        {
          name:"Editar Prod. Planificación",
          intern_name:"planificacion_producto",
          class:"btn btn-outline-primary",
        }
      ]
    },
    campo_por_el_que_agrupar:{
      nombre_campo:"planificacion_fecha_realizar",
      nombre_controler:"date_selector"
    },
    modificar_objeto_posteriormente:false
  };
  ngOnInit() {

    console.log("Menu planificacion:", this.menuService.menus);
    this.universalService.can_get(this.nombreControlador).subscribe({
      next: (data) => {
        this.crudConfig.can_ver= true;
        console.log("ver:",data);
      },
      error: (error) => {
        this.crudConfig.can_ver = false;
      }
    });

    this.universalService.can_update(this.nombreControlador).subscribe({
      next: (data) => {
        this.crudConfig.config_super_table.canEdit = true;
        console.log("editar:",data);
      },
      error: (error) => {
        this.crudConfig.config_super_table.canEdit = false;
      }
    });

    this.universalService.can_delete(this.nombreControlador,0+"").subscribe({
      next: (data) => {
          this.crudConfig.config_super_table.canDelete = true;
          console.log("borrar:",data);

      },
      error: (error) => {
          this.crudConfig.config_super_table.canDelete = false;
      }
    });

    this.universalService.can_create(this.nombreControlador).subscribe({
      next: (data) => {
          this.crudConfig.can_agregar = true;
          console.log("create:",data);
      },
      error: (error) => {
          this.crudConfig.can_agregar = false;
      }
    });
    this.universalService.request( 
      this.nombreControlador,"ver", "todos").subscribe(
      {
        next: (response: any) => {
          this.listaContenidos = response;
        
          for (let index = 0; index < response.length; index++) {
            let element = response[index];
            delete element["planificacion_timestamp_inicio"];
            delete element[this.nombreControlador+"_timestamp_final"];
            //element["planificacion_estado"] =  this.arrayEstados[element["planificacion_estado"]].nombre;
            
          }
          console.log("Lista Contenidos: ",this.listaContenidos);
        },
        error: (error:any) => {
        },
      }
    );
   this.universalService.request(
      "campo","ver", "todos").subscribe(
      {
      next: (response:any) =>
        {
          console.log("Lista medidas: ",this.listaContenidos);
          this.config_form[1].resources_autocomplete = response;
        }

      }
    );
    
    
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

  openModalAnyadir(events:any){
    ////alert("Te vamos a redirigir a pagina planificar productos planificacion");
  
    let modal = this._modalService.open(ModalAutofocusComponent);
    
    //Modificar variable para cambia el strong1
    modal.componentInstance.tittle ="Redirigir a pagina planificar productos planificacion"
    modal.componentInstance.strong1 = 'Si pulsas ok se te redirigira a planificar productos y si pulsas cancelar no ocurrira nada';
    //Modificar variable para cambia el palabra entre comillas
    modal.componentInstance.spanStrong = " ";
    //Modificar variable para cambia el strong2
    modal.componentInstance.strong2 = '.';
    //Modificar variable para cambia el texto normal
    modal.componentInstance.textoNormal =  '';
    //Modificar variable para cambia el texto de error
    modal.componentInstance.textDanger = '';

    modal.componentInstance.title = "Redirigir a pagina de planificar productos";
    modal.closed.subscribe((closed: any)=>{
      console.log('CLOSED modal:', closed);
      console.log('events:', events);
      this.redirigir(events);
    });
    
  }

  redirigir(events: any): void {
    this.planificacionService.idPlanificacion = events;
    this.router.navigateByUrl("/intranet/planificacion_producto");
    
  }

  butPerClicked($event: any) {
    console.log("butPerClicked:", $event);
    if($event.intern_name === "planificacion_producto"){
      this.redirigir($event.row);
    }
  }

}
