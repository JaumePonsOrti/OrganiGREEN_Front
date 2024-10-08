import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFormConfig } from 'projects/super-lib/src/lib/modulos/formularios/form_Config';
import { ModalAutofocusComponent } from 'projects/super-lib/src/lib/modulos/modals/modal-autofocus/modal-autofocus.component';
import { SuperTableConfig } from 'projects/super-lib/src/lib/modulos/tablas/super-tabla/super-tabla.component';
import { ConfigModal } from 'src/app/core/shared/models/configModal';
import { HashService } from 'src/app/core/shared/services/crytp/hash.service';
import { MenuService } from 'src/app/core/shared/services/menu/menu.service';
import { UniversalService } from 'src/app/core/shared/services/universal/universal.service';
import { UsuariosService } from 'src/app/core/shared/services/usuarios/usuarios.service';
import { ICrudConfig } from 'src/app/core/shared/views/new-crud/models/ICrudConfig';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
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
  public nombreControlador:string = "usuario";
  public headerArray:string[] = ["ID", "Email","Unidad de medida preferida","Rol","Contraseña","editable"]

  config_form:IFormConfig[] = [
    {
      type:"number",
      placeholder: "ID (no se puede modificar)",
      form_control_name: this.nombreControlador+"_id",
      disabled: true
    },
    {
      type:"text",
      placeholder:"Nombre Email",
      form_control_name:this.nombreControlador+"_"+"email",
      disabled:false
    },
    {
      type:"number",
     
      form_control_name:this.nombreControlador+"_"+"medida_id", 
      disabled:false,
      config_autocomplete:{
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
      },
      resources_autocomplete:[]
    },
    {
      type:"number",
      form_control_name:this.nombreControlador+"_"+"rol_id",
      disabled:false,
      config_autocomplete:{
        tipo_input:"text",
        campo_mostrar:{
          nombre_campo:"rol_nombre",
          nombre_tabla:"rol",
        },
        campo_referenciado:{
          nombre_campo:"rol_id",
          nombre_tabla:"rol",
        },
        nombre_campo:"rol_id",
        nombre_visible:"Nombre rol"
      },
      resources_autocomplete:[]
      
    },{
      type:"text",
      placeholder:"Contraseña",
      form_control_name:"usuario_contrasenya",
      disabled:false
    
    }
  ];
  
  public crudConfig: ICrudConfig = {
    can_agregar:false,
    can_ver:false,
    can_dataPicker: false,
    config_super_table:{
      canDelete: false,
      canEdit: false,
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
      "unidad_medida","ver", "todos").subscribe(
      {
      next: (response:any) =>
        {
          console.log("Lista medidas: ",this.listaContenidos);
          this.config_form[2].resources_autocomplete = response;
        }

      }
    );
    this.universalService.request(
      "rol","ver", "todos").subscribe(
      {
      next: (response:any) =>
        {
          console.log("Lista Rles: ",this.listaContenidos);
          this.config_form[3].resources_autocomplete = response;
        }

      }
    );
  
  }

  


}
