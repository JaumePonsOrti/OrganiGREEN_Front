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
  selector: 'app-campos',
  templateUrl: './campos.component.html',
  styleUrls: ['./campos.component.scss'],
})
export class CamposComponent  implements OnInit {
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
  public nombreControlador:string = "campo";
  
  config_form:IFormConfig[] = [
    {
      type:"number",
      placeholder: "ID (no se puede modificar)",
      form_control_name: this.nombreControlador+"_id",
      disabled: true
    },
    {
      type:"string",
      placeholder:"Nombre",
      form_control_name:"cliente_nombre",
      disabled:false
    },
    {
      type:"string",
      placeholder:"Mote",
      form_control_name:"cliente_mote", 
      disabled:false
    }
  ];
  
  ngOnInit() {
    
    this.universalService.request( 
      this.nombreControlador,"ver", "todos").subscribe(
      {
        next: (response) => {
          this.listaContenidos = response;
          this.editar();
          console.log("Lista Contenidos: ",this.listaContenidos);
        },
        error: (error) => {
        },
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
    console.log("O: ",o);
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
        delete o[this.nombreControlador+"_id"];
        this.listaContenidos.push(o);
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
     
      delete o["editable"];
      this.universalService.request(this.nombreControlador, funcion,obcion,o).subscribe(
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
