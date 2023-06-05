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


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent extends ClassView implements OnInit {
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
    (click)="modal.close('Ok click')">Ok</button>`;
  
  constructor(
    rutaActivaLocal: ActivatedRoute, 
     universalService: UniversalService, 
     public _modalService: NgbModal
    ) 
  { 
    super("margin-left-menu-desplegado", universalService, rutaActivaLocal);
   // this.refreshCountries();
  }
  public listaContenidos:any = [];
  ngOnInit() {
    this.alInicio();  
    this.universalService.request( this.nombreControlador,"ver", "todos").subscribe(
      {
        next: (response) => {
          this.listaContenidos = response;
        },
        error: (error) => {
        },
      }
    );
  }
  /*
  page = 1;
	pageSize = 4;
	collectionSize = this.listaContenidos.length;
	countries: Country[];

	refreshCountries() {
		this.countries = COUNTRIES.map((country, i) => ({ id: i + 1, ...country })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}
  */

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

  crear() {
  }

  modificarParaInsert() {
    let object = Object.assign({},this.listaContenidos[0]);
    delete object[this.nombreControlador+"_id"];
    if(this.nombreControlador === "usuario"){
      object[this.nombreControlador+"_password"] = "";
      delete object[this.nombreControlador+"_intentos_fallidos"];
    }
    return object;
  }

  openModal(object: any) {
    //let modal = this._modalService.open(MODALS["autoFocus"]);
    let modal = this._modalService.open(ModalAutofocusComponent);
    console.log('let Modal:', modal);
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

  open() {
		const modalRef = this._modalService.open(NewModalComponent);
		modalRef.componentInstance.name = 'World';
	}
}

