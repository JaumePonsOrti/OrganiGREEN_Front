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
  
  config_form:IFormConfig[] = [
    {
      type:"number",
      placeholder: "ID (no se puede modificar)",
      form_control_name: this.nombreControlador+"_id",
      disabled: true
    },
    {
      type:"number",
      placeholder:"Numero poligono",
      form_control_name:"parcelas_poligono",
      disabled:false
    },
    {
      type:"number",
      placeholder:"Numero parcela",
      form_control_name:"parcelas_parcela", 
      disabled:false
    },
    {
      type:"number",
      placeholder:"Numero provincia",
      form_control_name:"parcelas_provincia",
      disabled:false
    },
    {
      type:"number",
      placeholder:"Numero municipio",
      form_control_name:"parcelas_municipio", 
      disabled:false
    }, 
    {
      type:"number",
      placeholder:"ID campo (FALTA AUTOCOMPLETE)",
      form_control_name:"parcelas_campo_id",
      disabled:false,
      

    },
    {
      type:"number",
      placeholder:"Tamaño m2",
      form_control_name:"tamanyo_m2", 
      disabled:false
    }
  ];
  
  ngOnInit() {
    
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
    
  }


  

}
