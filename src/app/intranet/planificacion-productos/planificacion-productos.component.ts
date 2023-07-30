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
  selector: 'app-planificacion-productos',
  templateUrl: './planificacion-productos.component.html',
  styleUrls: ['./planificacion-productos.component.scss'],
})
export class PlanificacionProductosComponent  implements OnInit {

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
  public nombreControlador:string = "productos_planificados";

  headerArray = ["ID", "Producto", "ID Planificacion","Numero Lote","Producto dueño","editable"];
 

  config_form:IFormConfig[] = [
    {
      type:"number",
      placeholder: "ID (no se puede modificar)",
      form_control_name: "productos_planificados_id",
      disabled: true
    },
    {
      type:"number",
      placeholder:"Producto",
      form_control_name:"productos_planificados_id_producto",
      disabled:false,
      config_autocomplete:{
        tipo_input:"text",
        campo_mostrar:{
          nombre_campo:"productos_nombre",
          nombre_tabla:"producto",
        },
        campo_referenciado:{
          nombre_campo:"productos_id",
          nombre_tabla:"productos",
        },
        nombre_campo:"productos_id",
        nombre_visible:"Nombre producto"
      },
    },
    {
      type:"number",
      placeholder:"Planificacion (No tocar)",
      form_control_name:"productos_planificados_id_planificacion", 
      disabled:false
    },
    {
      type:"string",
      form_control_name:"productos_planificados_numero_de_lote", 
      placeholder:"Numero de lote",
      disabled:false
    },{
      type:"number",
      placeholder:"Producto dueño",
      form_control_name:"productos_planificados_producto_dueño", 
      disabled:false
    },

  ];
  
  public crudConfig: ICrudConfig = {
    can_agregar:false,
    can_ver:false,
    can_dataPicker: false,
    config_super_table:{
      canDelete: false,
      canEdit: false,
    },
  };
  ngOnInit() {
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
          //this.listaContenidos = response;
          let list :any[] = [];

          this.crudConfig.objeto_referencia=response[1];

          for (let index = 0; index < response.length; index++) {
            const element = response[index];
              if(element.productos_planificados_id_planificacio === this.planificacionService.idPlanificacion.planificacion_id){
                list.push(element);
              }
          }
          this.listaContenidos = list;
          
          
        },
        error: (error:any) => {
        },
      }
    );
   this.universalService.request(
      "productos","ver", "todos").subscribe(
      {
      next: (response:any) =>
        {
          console.log("Lista productoss: ",this.listaContenidos);
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

  volverAPlanificacion(){
    this.router.navigateByUrl("/intranet/planificacion")
  }
  
}
