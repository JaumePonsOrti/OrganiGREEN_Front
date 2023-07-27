import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFormConfig } from 'projects/super-lib/src/lib/modulos/formularios/form_Config';
import { SuperTableConfig } from 'projects/super-lib/src/lib/modulos/tablas/super-tabla/super-tabla.component';
import { HashService } from 'src/app/core/shared/services/crytp/hash.service';
import { MenuService } from 'src/app/core/shared/services/menu/menu.service';
import { UniversalService } from 'src/app/core/shared/services/universal/universal.service';
import { UsuariosService } from 'src/app/core/shared/services/usuarios/usuarios.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent  implements OnInit {

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
  public nombreControlador:string = "productos";
  
  config_form:IFormConfig[] = [
    {
      type:"number",
      placeholder: "ID (no se puede modificar)",
      form_control_name: this.nombreControlador+"_id",
      disabled: true
    },
    {
      type:"number",
      placeholder:"Numero registro",
      form_control_name:"productos_numero_registro",
      disabled:false
    },
    {
      type:"text",
      placeholder:"Nombre",
      form_control_name:"productos_nombre", 
      disabled:false
    },
    {
      type:"number",
      placeholder:"Precio",
      form_control_name:"productos_precio",
      disabled:false
    },
    {
      type:"number",
      placeholder:"Cantidad recomendada",
      form_control_name:"productos_cantidad_referenciada", 
      disabled:false
    }, 
    {
      type:"number",
      placeholder:"unidad de medidas",
      form_control_name:"productos_medida_id",
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

    },
  
  ];
  
  ngOnInit() {
    
    this.universalService.request( 
      this.nombreControlador,"ver", "todos").subscribe(
      {
        next: (response: any) => {
          this.listaContenidos = response;
        
          console.log("Lista Contenidos: ",this.listaContenidos);
        },
        error: (error:any) => {
        },
      }
    );
    this.universalService.request(
      "unidad_medida","ver", "todos").subscribe(
      {
      next: (response:any) =>
        {
          console.log("Lista medidas: ",this.listaContenidos);
          this.config_form[5].resources_autocomplete = response;
        }

      }
    );
    
  }
}
