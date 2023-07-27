import { Component, OnInit,Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassView } from '../classView';
import { UniversalService } from '../../services/universal/universal.service';
import { 
  NgbModal 
} from '@ng-bootstrap/ng-bootstrap';
import { ModalAutofocusComponent } from '../../components/modals/modal-autofocus/modal-autofocus.component';
import { HashService } from '../../services/crytp/hash.service';
import { FormControl } from '@angular/forms';
import { ConfigModal } from '../../models/configModal';
import { s } from '@fullcalendar/core/internal-common';
import { MenuService } from '../../services/menu/menu.service';
import { Configuracion_View } from '../../models/cofiguracion_view';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { IFormConfig } from 'projects/super-lib/src/lib/modulos/formularios/form_Config';
import { SuperTableConfig } from 'projects/super-lib/src/lib/modulos/tablas/super-tabla/super-tabla.component';
import { Convertidor_Tipos } from '../../helpers/Convertidor_tipos.helper';


@Component({
  selector: 'app-new-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit, OnChanges {
  constructor(
    public rutaActiva: ActivatedRoute,
    private universalService:UniversalService, 
    private hasService: HashService,
    private _modalService:NgbModal, 
    public menuService: MenuService,
    public router:Router, 
    public usuario:UsuariosService
  ) { }
  
  @Input() nombreControlador :string = "";
  @Input() listaContenidos:any[] = [];
  /*
  * @deprecated Por favor utiliza crud CONFIG DE AHORA EN adelante
  */
  @Input() config_form: IFormConfig[] = [];
  @Input() crudConfig:ICrudConfig = {

  };
  config: SuperTableConfig = {
    canDelete: true,
    canEdit: true,
  };

  peticionBD:boolean = false;
  can_ver!: boolean;
  can_agregar!: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    if(typeof this.listaContenidos !== "undefined" && this.listaContenidos.length>0){
      this.listaContenidos = this.listaContenidos;
      this.editar();
      this.universalService.can_update(this.nombreControlador).subscribe({
        next: (data) => {
          this.config.canEdit = true;
          console.log("editar:",data);
        },
        error: (error) => {
          this.config.canEdit = false;
        }
      });
    }
  }

  formControl: FormControl = new FormControl();

  ngOnInit() {
    this.formControl.valueChanges.subscribe({
      next:(e:any) =>{
        alert(e);
      }
    })
    /*
    if(typeof this.listaContenidosE !== "undefined" && this.listaContenidosE.length>0){
      this.listaContenidos = this.listaContenidosE;
      this.editar();
    }else{
      this.peticionBD = true;
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
    }
    
    */
    if(typeof this.listaContenidos !== "undefined" && this.listaContenidos.length>0){
      this.listaContenidos = this.listaContenidos;
      this.editar();
    }
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
    try {
      for (let index = 0; index < this.listaContenidos.length; index++) {
        const element = this.listaContenidos[index];
  
        if(this.nombreControlador === "usuario"){
          element["usuario_contrasenya"] = "";
        }
        element["editable"] = false;
        this.listaContenidos[index] = element;
      }
    } catch (error) {
      
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
    console.log(object.object);
    let keys: string[] = Object.keys(object.object);
    console.log(keys);
    this.universalService.request(this.nombreControlador, "borrar", object.object[this.nombreControlador+"_id"]).subscribe(
      {
        next: (response) => {
          
          delete this.listaContenidos[object.i];
          this.listaContenidos = this.listaContenidos.filter((item: any) => typeof item  != "undefined" );
         console.log("lista despues de borrar",this.listaContenidos);
        },
        error: (error) => {
          alert("Error al borrar. Recarga la pagina si no se hace automáticamente");
          window.location.reload();
        },
      }
    );
    
  }

  ejecuta(o:any,funcion:any) {
    console.log("Objeto: ",o);
    let obcion = "";
    let oCopy = Object.assign({},o);

    let sePuedeEjecutar : boolean = true;
    switch (funcion) {
      case "crear":
        if(this.nombreControlador == "usuario"){
          o[this.nombreControlador+"_id"] = (this.listaContenidos[this.listaContenidos.length-1][this.nombreControlador+"_id"])+1;

          if(o.usuario_contrasenya.length<8)
          {
            sePuedeEjecutar = false;
            alert("La contraseña debe tener al menos 8 caracteres");
          }else if(o.usuario_contrasenya.length>=8){
            sePuedeEjecutar = true;
            o.usuario_contrasenya = this.hasService.sha3_512(o.usuario_contrasenya);
          }
          
        }
        this.listaContenidos.push(o);
        delete o[this.nombreControlador+"_id"];
        
        break;
      case "actualizar":
        obcion = o[this.nombreControlador+"_id"];
        
        if(this.nombreControlador == "usuario"){
          if(o.usuario_contrasenya.length === 0)
          {
            alert("No se ha rellenado el espacio para la contraseña del usuario, por lo tanto se mantendra la anterior");
          }else if(o.usuario_contrasenya.length<8)
          {
            
            alert("Se usara la antigua contraseña, dado que la nueva no tiene al menos 8 caracteres");
            o.usuario_contrasenya = "";   
          }else if(o.usuario_contrasenya.length>=8){
            o = Object.assign({}, o);
            o.usuario_contrasenya = this.hasService.sha3_512(o.usuario_contrasenya);
          }
        }
       
        break;
      default:
        break;
    }
    
    
    if(sePuedeEjecutar === true){
     
      delete oCopy["editable"];
      let oRef:any = Object.assign({},this.listaContenidos[0]);
      
      delete oCopy[this.nombreControlador+"_id"];
      delete oRef[this.nombreControlador+"_id"];
      delete oRef["editable"];
 
      oCopy = Convertidor_Tipos.convertObject(oRef,o);
      this.universalService.request(this.nombreControlador, funcion,obcion,oCopy).subscribe(
        {
          next : (response:any) => {
            o = this.listaContenidos[this.listaContenidos.length - 1];
            this.listaContenidos[this.listaContenidos.length - 1]["editable"] = false;
            this.listaContenidos[this.listaContenidos.length - 1][this.nombreControlador+"_id"] = response[this.nombreControlador+"_id"];
          },
          error : (error) => {
            let mensaje:string ="Error al Crear/Editar. "+
            "Si estas intentando editar un usuario  vuelve a crear otro nuevo, elimina el antiguo y cierra sesion si no se hace automaticamente automaticamente con la nu.Recarga la pagina si no se hace automáticamente.";
            if(this.nombreControlador !== "usuario") {
              mensaje ="Error al Crear/Editar. "+
              "Si estas intentando editar y da error elimina y vuelve a crear. "+
              "Recarga la pagina si no se hace automáticamente antes de continuar para solucionar posibles problemas.";
              
            }
            
            alert(mensaje);
          //  window.location.reload();
            console.log("Error al CREAR/Editar:",error);
        }
        }
      );
      
    }
    
  }
  cerrarSesion() { 
  
    this.usuario.cerrarSesion();
    this.router.navigateByUrl('/');
  }

}

