import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassView } from '../classView';
import { UniversalService } from '../../services/universal/universal.service';
import { 
  NgbModal,
  NgbModalRef 
} from '@ng-bootstrap/ng-bootstrap';
import { ModalAutofocusComponent } from '../../components/modals/modal-autofocus/modal-autofocus.component';
import { NewModalComponent } from '../../components/modals/new-modal/new-modal.component';
import { HashService } from '../../services/crytp/hash.service';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent extends ClassView implements OnInit {
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
    (click)="modal.close('Ok click')">Ok</button>`;
  
 //Este es el objeto que sirve como referencia para crear el formulario para crear el contenido  
  public contenidoInsert:any = "";
  constructor(
    rutaActivaLocal: ActivatedRoute, 
    universalService: UniversalService, 
    private hasService: HashService,
     public _modalService: NgbModal
    ) 
  { 
    super("margin-left-menu-desplegado", universalService, rutaActivaLocal);
  }
  

  public listaContenidos:any = [];
  ngOnInit() {
    this.alInicio();  
    this.universalService.request( this.nombreControlador,"ver", "todos").subscribe(
      {
        next: (response) => {
          this.listaContenidos = response;
          
          this.contenidoInsert = this.modificarParaInsert();
          if(this.nombreControlador == "usuario"){
            for (let index = 0; index < this.listaContenidos.length; index++) {
              const element = this.listaContenidos[index];
              element["usuario_contrasenya"] = "";
            }
          }
        },
        error: (error) => {
        },
      }
    );
  }
  
  eliminar(object: any) {
    console.log(object);
    this.universalService.request(this.nombreControlador, "borrar", object.usuario_id).subscribe(
      {
        next: (response) => {
          
          this.universalService.request( this.nombreControlador,"ver", "todos").subscribe(
            {
              next: (response) => {
                this.listaContenidos = response;
                alert("Usuario eliminado con el id: "+ object.usuario_id+ " con el email: "+ object.usuario_email);
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

  
  ejecuta(o:any) {
    let oCopy = Object.assign({},o);
    let sePuedeEjecutar : boolean = true;
    if(this.nombreControlador == "usuario"){
      if(o.usuario_contrasenya.length<8)
      {
        sePuedeEjecutar = false;
      }else if(o.usuario_contrasenya.length>=8){
        sePuedeEjecutar = true;
        o.usuario_contrasenya = this.hasService.sha3_512(o.usuario_contrasenya);
      }
    }
    if(sePuedeEjecutar === true){
      this.universalService.request(this.nombreControlador, "crear","",o).subscribe(
        {
          next : (response) => {
            this.listaContenidos.push();
          },
          error : (error) => {
            console.log("Error al CREAR:",error);
          },
        }
      );
    }
    
  }

  modificarParaInsert() {
    let object = Object.assign({},this.listaContenidos[0]);
    delete object[this.nombreControlador+"_id"];
    
    if(this.nombreControlador === "usuario"){
      object[this.nombreControlador+"_contrasenya"] = "";
      delete object[this.nombreControlador+"_intentos_fallidos"];
    }
    return object;
  }

  openModal(object: any) {
    //let modal = this._modalService.open(MODALS["autoFocus"]);
    let modal = this._modalService.open(ModalAutofocusComponent);
    
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
    modal.componentInstance.textoNormal =  ' Este' + this.nombreControlador+ 
    'dejara de estar disponible para su gestión y sera eliminada permanentemente';
    //Modificar variable para cambia el texto de error
    modal.componentInstance.textDanger = 'Esta acción no se puede deshacer';

    modal.closed.subscribe((closed)=>{
      console.log('CLOSED modal:', closed);
      this.eliminar(object);
    });
    modal.dismissed.subscribe((dismis)=>{
      console.log('Dismis modal:', dismis);
    });
		//modal.componentInstance.name = 'ModalAutofocusComponent';
    //
    /*
    */

  }

}

