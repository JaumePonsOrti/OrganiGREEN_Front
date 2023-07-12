import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFormConfig } from 'projects/super-lib/src/lib/modulos/formularios/form_Config';
import { ModalAutofocusComponent } from 'projects/super-lib/src/lib/modulos/modals/modal-autofocus/modal-autofocus.component';
import { ModalsModule } from 'src/app/core/shared/components/modals/modals.module';
import { ConfigModal } from 'src/app/core/shared/models/configModal';
import { UniversalService } from 'src/app/core/shared/services/universal/universal.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent  implements OnInit {


  constructor(public rutaActiva: ActivatedRoute, private universalService:UniversalService, private _modalService:NgbModal) { }
  public listaContenidos:any = [];
  public nombreControlador:string = "cliente";
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
  }
  config_form:IFormConfig[] = [
    {
      type:"number",
      placeholder: "ID (no se puede modificar)",
      form_control_name:"cliente_id",
      disabled:true
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
    this.universalService.request(this.nombreControlador,"actualizar",$event[this.config_form[0].form_control_name]).subscribe();
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

}
