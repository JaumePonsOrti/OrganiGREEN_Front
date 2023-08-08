import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFormConfig } from 'projects/super-lib/src/lib/modulos/formularios/form_Config';
import { SuperTableConfig } from 'projects/super-lib/src/lib/modulos/tablas/super-tabla/super-tabla.component';
import { HashService } from 'src/app/core/shared/services/crytp/hash.service';
import { MenuService } from 'src/app/core/shared/services/menu/menu.service';
import { UniversalService } from 'src/app/core/shared/services/universal/universal.service';
import { UsuariosService } from 'src/app/core/shared/services/usuarios/usuarios.service';
import { ICrudConfig } from 'src/app/core/shared/views/new-crud/models/ICrudConfig';

@Component({
  selector: 'app-resumen-planificacion',
  templateUrl: './resumen-planificacion.component.html',
  styleUrls: ['./resumen-planificacion.component.scss'],
})
export class ResumenPlanificacionComponent  implements OnInit {

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
  public nombreControlador:string = "resumen-planificacion";

  headerArray = ["ID", "Nombre Producto ", "Dosis total para el dia","editable"];
    
  public crudConfig: ICrudConfig = {
    can_agregar:false,
    can_ver:true,
    can_dataPicker: true,
    config_super_table:{
      canDelete: false,
      canEdit: false,
    }
  };
  ngOnInit() {
   /*
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
    */
    this.universalService.request( 
      this.nombreControlador,"ver", "todos").subscribe(
      {
        next: (response: any) => {
          this.listaContenidos = response;
          let date = new Date();
          
          let date2 = new Date(date.getFullYear() + "-"+(date.getMonth()+1 )+ "-"+date.getDate()+ " 00:00:00:UTC").toJSON();
          this.listaContenidos2 = this.listaContenidos[date2] ?? [];
          
          console.log("Lista Contenidos: ",this.listaContenidos);
        },
        error: (error:any) => {
        },
      }
    );
    

    
  }

  
  public listaContenidos2:any[] = [];
  fechaCambiada(date:any) {
    let fechaSeleccionada = new Date(date).toJSON();
    this.listaContenidos2 = this.listaContenidos[fechaSeleccionada]??[];
  }
}
