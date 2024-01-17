import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFormConfig } from 'projects/super-lib/src/lib/modulos/formularios/form_Config';
import { ModalAutofocusComponent } from 'projects/super-lib/src/lib/modulos/modals/modal-autofocus/modal-autofocus.component';
import { SuperTableConfig } from 'projects/super-lib/src/lib/modulos/tablas/super-tabla/super-tabla.component';
import { Convertidor_Tipos } from 'src/app/core/shared/helpers/Convertidor_tipos.helper';
import { ConfigModal } from 'src/app/core/shared/models/configModal';
import { CamposService } from 'src/app/core/shared/services/campos/campos.sevice';
import { HashService } from 'src/app/core/shared/services/crytp/hash.service';
import { MenuService } from 'src/app/core/shared/services/menu/menu.service';
import { UniversalService } from 'src/app/core/shared/services/universal/universal.service';
import { UsuariosService } from 'src/app/core/shared/services/usuarios/usuarios.service';
import { ICrudConfig } from 'src/app/core/shared/views/new-crud/models/ICrudConfig';

@Component({
  selector: 'app-campos',
  templateUrl: './campos.component.html',
  styleUrls: ['./campos.component.scss'],
})
export class CamposComponent implements OnInit {
  config: SuperTableConfig = {
    canDelete: true,
    canEdit: true,
  };
  can_ver!: boolean;
  can_agregar!: boolean;

  public headerArray:string[] = ["ID", "Nombre del campo","Tamaño de factuarción","Cliente","editable"];
  constructor(
    public rutaActiva: ActivatedRoute,
    private universalService:UniversalService, 
    private hasService: HashService,
    private _modalService:NgbModal, 
    public menuService: MenuService,
    public router:Router, 
    public usuario:UsuariosService,
    private camposService: CamposService,
  ) { }
  public listaContenidos:any = [];
  public nombreControlador:string = "campo";
  
  config_form:IFormConfig[] = [
    {
      type:"number",
      placeholder: "ID (no se puede modificar)",
      form_control_name: this.nombreControlador+"_id",
      disabled: true
    },
    {
      type:"text",
      placeholder:"Nombre campo",
      form_control_name:"campo_nombre",
      disabled:false
    },
    {
      type:"number",
      placeholder:"Tamanyo",
      form_control_name:"campo_tamanyo_facturacion", 
      disabled:false
    },
    {
      type:"number",
      form_control_name:"campo_cliente_id",
      disabled:false,
      config_autocomplete:{
        tipo_input:"text",
        campo_mostrar:{
          nombre_campo:"cliente_nombre",
          nombre_tabla:"cliente",
        },
        campo_referenciado:{
          nombre_campo:"cliente_id",
          nombre_tabla:"cliente",
        },
        nombre_campo:"cliente_id",
        nombre_visible:"Nombre Cliente",
        
      }
    }
  ];
  
  public crudConfig:ICrudConfig = {
    can_agregar:false,
    can_ver:false,
    can_dataPicker: false,
    config_super_table:{
      canDelete: false,
      canEdit: false,
      buttonPersonalized: [
        {
          name:"Editar Parcelas",
          intern_name:"parcelas",
          class:"btn btn-outline-primary",
        }
      ]
    }
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
        next: (response:any) => {
          this.listaContenidos = response;
          
          console.log("Lista Contenidos: ",this.listaContenidos);
         // this.config_form[3].resources_autocomplete = response;
        },
        error: (error) => {
        },
      }
    );

    this.universalService.request(
      "cliente","ver", "todos").subscribe(
      {
      next: (response:any) =>
        {
          console.log("Lista Cliente: ",response);
          this.config_form[3].resources_autocomplete = response;
        }

      }
    );
  }  

  redirigir(events: any): void {
    this.camposService.cambiarDato(events);
    this.router.navigateByUrl("/intranet/parcela");
  }

  butPerClicked($event: any) {
    if($event.intern_name === "parcelas"){
      this.redirigir($event.row);
    }
  }

 }
