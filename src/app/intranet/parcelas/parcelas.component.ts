import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFormConfig } from 'projects/super-lib/src/lib/modulos/formularios/form_Config';
import { ModalAutofocusComponent } from 'projects/super-lib/src/lib/modulos/modals/modal-autofocus/modal-autofocus.component';
import { SuperTableConfig } from 'projects/super-lib/src/lib/modulos/tablas/super-tabla/super-tabla.component';
import { ConfigModal } from 'src/app/core/shared/models/configModal';
import { HashService } from 'src/app/core/shared/services/crytp/hash.service';
import { MenuService } from 'src/app/core/shared/services/menu/menu.service';
import { UniversalService } from 'src/app/core/shared/services/universal/universal.service';
import { UsuariosService } from 'src/app/core/shared/services/usuarios/usuarios.service';import { Component, OnInit } from '@angular/core';
import { ICrudConfig } from 'src/app/core/shared/views/new-crud/models/ICrudConfig';

@Component({
  selector: 'app-parcelas',
  templateUrl: './parcelas.component.html',
  styleUrls: ['./parcelas.component.scss'],
})
export class ParcelasComponent implements OnInit {
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
  public nombreControlador:string = "parcelas";
  public headerArray:any = [
    "ID", 
    "Nº poligono",
    "Nº de parcela",
    "Nº provincia",
    "Nº municipio",
    "Campo", 
    "Tamaño m2",
    "editable"
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
      placeholder:"Nº Poligono",
      form_control_name:"parcelas_poligono",
      disabled:false
    },
    {
      type:"number",
      placeholder:"Nº Parcela",
      form_control_name:"parcelas_parcela", 
      disabled:false
    },
    {
      type:"number",
      placeholder:"Nº Provincia",
      form_control_name:"parcelas_provincia",
      disabled:false
    },
    {
      type:"number",
      placeholder:"Nº Municipio",
      form_control_name:"parcelas_municipio", 
      disabled:false
    }, 
    {
      type:"number",
      form_control_name:"parcelas_campo_id",
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
        nombre_visible:"Campo"
      },
      resources_autocomplete:[],
      disabled:false,
      

    },
    {
      type:"number",
      placeholder:"Tamaño m2",
      form_control_name:"tamanyo_m2", 
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
        next: (response) => {
          this.listaContenidos = response;
        
          console.log("Lista Contenidos: ",this.listaContenidos);
        },
        error: (error) => {
        },
      }
    );
    this.universalService.request( 
      "campo","ver", "todos").subscribe(
      {
        next: (response:any) => {
          this.config_form[5].resources_autocomplete = response;
          console.log("Lista Contenidos: ",this.listaContenidos);
        },
        error: (error) => {
        },
      }
    );
    
  }


  

}
