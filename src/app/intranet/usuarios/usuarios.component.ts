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
  
  ngOnInit() {
    
    this.universalService.request( 
      this.nombreControlador,"ver", "todos").subscribe(
      {
        next: (response:any) => {
          this.listaContenidos = response;
          this.editar();
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
    this.universalService.can_get(this.nombreControlador).subscribe({
      next: (data) => {
        this.can_ver= true;
        console.log("ver:",data);
      },
      error: (error) => {
        this.can_ver = false;
      }
    });

    this.universalService.can_update(this.nombreControlador).subscribe({
      next: (data) => {
        this.config.canEdit = true;
        console.log("editar:",data);
      },
      error: (error) => {
        this.config.canEdit = false;
      }
    });

    this.universalService.can_delete(this.nombreControlador,0+"").subscribe({
      next: (data) => {
          this.config.canDelete = true;
          console.log("borrar:",data);

      },
      error: (error) => {
          this.config.canDelete = false;
      }
    });

    this.universalService.can_create(this.nombreControlador).subscribe({
      next: (data) => {
          this.can_agregar = true;
          console.log("create:",data);
      },
      error: (error) => {
          this.can_agregar = false;
      }
    });
  }

  private editar(){
    for (let index = 0; index < this.listaContenidos.length; index++) {
      const element = this.listaContenidos[index];

      if(this.nombreControlador === "usuario"){
        element["usuario_contrasenya"] = "";
      }
      element["editable"] = false;
      this.listaContenidos[index] = element;
    }
  }

  clickSave($event:any):void {
    this.ejecuta($event,"actualizar");
  }
  
  openModal(object: any, configModal?:ConfigModal) {
    console.log("A borar:",object);
    //let modal = this._modalService.open(MODALS["autoFocus"]);
    let modal = this._modalService.open(ModalAutofocusComponent);
    let modalC:ConfigModal|undefined = configModal;
    if(!configModal){
     
      try {
        modalC = 
        {
          title: "Eliminar "+this.nombreControlador+" con el id: " + object[this.nombreControlador+"_id"],
          strong1: object.nombre,
          strong2: "",
          spanStrong: "",
          textDanger: "",
          textoButton: "Eliminar",
          classButtonOk: "btn btn-danger"
        };
      } catch (error){ 
      }
    }
    try {
      //Editar titulo modal
      modal.componentInstance.tittle = "Eliminar "+this.nombreControlador+" con el id: " + object[this.nombreControlador+"_id"];
    } catch (error){ 
    }

    //Modificar variable para cambia el strong1
    modal.componentInstance.strong1 = '¿Estas seguro de que quieres elimar este';
    //Modificar variable para cambia el palabra entre comillas
    modal.componentInstance.spanStrong = ' "' + this.nombreControlador + '" ';
    //Modificar variable para cambia el strong2
    modal.componentInstance.strong2 = 'de la base de datos?';
    //Modificar variable para cambia el texto normal
    modal.componentInstance.textoNormal =  ' Este ' + this.nombreControlador+ 
    ' dejara de estar disponible para su gestión y sera eliminada permanentemente';
    //Modificar variable para cambia el texto de error
    modal.componentInstance.textDanger = 'Esta acción no se puede deshacer';

    modal.closed.subscribe((closed: any)=>{
      console.log('CLOSED modal:', closed);
      this.eliminar(object);
    });
    modal.dismissed.subscribe((dismis: any)=>{
      console.log('Dismis modal:', dismis);
    });
		//modal.componentInstance.name = 'ModalAutofocusComponent';
    //
    /*
    */

  }
  
  eliminar(object: any) {
    console.log(object);
    let keys: string[] = Object.keys(object);
    console.log(keys);
    this.universalService.request(this.nombreControlador, "borrar", object[keys[0]]).subscribe(
      {
        next: (response) => {
          
          this.universalService.request( this.nombreControlador,"ver", "todos").subscribe(
            {
              next: (response) => {
                
                this.listaContenidos = response;
                this.editar();
                console.log("ListaContenido:",this.listaContenidos);
              },
              error: (error) => {
              },
            }
          );
        },
        error: (error) => {
        },
      }
    );
    
  }

  ejecuta(o:any,funcion:any) {
    console.log("Objeto: ",o);
    o.usuario_medida_id = ""+ o.usuario_medida_id;
    o.usuario_rol_id = ""+ o.usuario_rol_id;
    let obcion = "";
    let oCopy = Object.assign({},o);

    let sePuedeEjecutar : boolean = true;
    switch (funcion) {
      case "crear":
        if(this.nombreControlador == "usuario"){
          o[this.nombreControlador+"_id"] = (this.listaContenidos[this.listaContenidos.length-1][this.nombreControlador+"_id"])+1;
          alert("Usuario compraseña:"+ o.usuario_contrasenya);
          if(o.usuario_contrasenya.length<8)
          {
            sePuedeEjecutar = false;
            alert("La contraseña debe tener al menos 8 caracteres");
          }else if(o.usuario_contrasenya.length>=8){
            sePuedeEjecutar = true;
            //Asiganamos la contraseña cifrada en la la variable copia del objeto
            oCopy.usuario_contrasenya = this.hasService.sha3_512(o.usuario_contrasenya);
          }
          
        }
        delete oCopy[this.nombreControlador+"_id"];
        this.listaContenidos.push(o);
        break;
      case "actualizar":
        obcion = oCopy[this.nombreControlador+"_id"];
        
        if(this.nombreControlador == "usuario"){
          if(oCopy.usuario_contrasenya.length === 0)
          {
            alert("No se ha rellenado el espacio para la contraseña del usuario, por lo tanto se mantendra la anterior");
          }else if(oCopy.usuario_contrasenya.length<8)
          {
            
            alert("Se usara la antigua contraseña, dado que la nueva no tiene al menos 8 caracteres");
               
          }else if(o.usuario_contrasenya.length>=8){
            oCopy = Object.assign({},o);
            //o.usuario_contrasenya = "";
            oCopy.usuario_contrasenya = this.hasService.sha3_512(o.usuario_contrasenya);
          }
        }
       
        break;
      default:
        break;
    }
    
    
    if(sePuedeEjecutar === true){
     
      delete oCopy["editable"];
      this.universalService.request(this.nombreControlador, funcion,obcion,oCopy).subscribe(
        {
          next : (response) => {
            o["editable"] = false;
            
          },
          error : (error) => {
            console.log("Error al CREAR:",error);
          },
        }
      );
      
    }
    
  }
  cerrarSesion() { 
  
    this.usuario.cerrarSesion();
    this.router.navigateByUrl('/');
  }


}
