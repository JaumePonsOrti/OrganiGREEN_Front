import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public listaFormsContol: any = [];
  public listaClavesContenido: Array<any> = [];
  public listaClavesContenidoSinNombreTablas: Array<any> = [];
  private posicionContenidoEditado:number = 0
  ngOnInit() {
    this.alInicio();  
    this.universalService.request( this.nombreControlador,"ver", "todos").subscribe(
      {
        next: (response) => {
          this.listaContenidos = response;

          for (let index = 0; index < this.listaContenidos.length; index++) {
            const element = this.listaContenidos[index];
            if(this.nombreControlador === "usuario"){
              element["usuario_contrasenya"] = "";
            }
            element["editable"] = false;
            this.listaContenidos[index] = element;
          }
           if (this.listaContenidos.length > 0) {
            this.contenidoInsert = this.modificarParaInsert();
            this.getFormControl(this.listaContenidos[0]);
            
            this.listaClavesContenido =  Object.keys(this.listaContenidos[0]);
            //Añadimos las claves a  la lista de claves sin el nombre de la tabla
            //Para obtener la clave si el nombre de la tabla habrá que trimear campo por 
            //campo el nombre de la tabla con la variable nombreControlador
            let tamanyoNombreControlador = this.nombreControlador.length;
            for (let index = 0; index < tamanyoNombreControlador; index++) {
              const element:string = this.listaClavesContenido[index];
              let sliceNombre:string = element.slice(tamanyoNombreControlador+1);
              let primeraMayuscula:string = sliceNombre.charAt(0).toUpperCase();
              let sliceNombre2:string = sliceNombre.slice(1);
              sliceNombre = primeraMayuscula + sliceNombre2;
              this.listaClavesContenidoSinNombreTablas.push(sliceNombre);
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

  
  ejecuta(o:any,funcion:any) {
    let obcion = "";
    let oCopy = Object.assign({},o);

    let sePuedeEjecutar : boolean = true;
    switch (funcion) {
      case "crear":
        if(this.nombreControlador == "usuario"){
          if(o.usuario_contrasenya.length<8)
          {
            sePuedeEjecutar = false;
            alert("La contraseña debe tener al menos 8 caracteres");
          }else if(o.usuario_contrasenya.length>=8){
            sePuedeEjecutar = true;
            o.usuario_contrasenya = this.hasService.sha3_512(o.usuario_contrasenya);
          }
        }
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
      this.universalService.request(this.nombreControlador, funcion,obcion,o).subscribe(
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
  
  modificarEnBd(index: number) {
    let object:any = this.listaContenidos[index];
    for (let index = 0; index < this.listaClavesContenido.length-1; index++) {
      object[this.listaClavesContenido[index]] =  this.listaFormsContol[index].getRawValue();     
    }
    if(this.nombreControlador === "usuario"){
      if(object.usuario_medida_id === null){
        object.usuario_medida_id = "";
      }
      
    }
    this.listaContenidos[index] = object;
    this.activarDesactivarEdicion(index);
    this.ejecuta(object,"actualizar");
  }

  modificarParaInsert() {
    let object = Object.assign({},this.listaContenidos[0]);
    delete object[this.nombreControlador+"_id"];
    
    if(this.nombreControlador === "usuario"){
      //object[this.nombreControlador+"_contrasenya"] = "";
      delete object[this.nombreControlador+"_intentos_fallidos"];
    }
    delete object["editable"];
    return object;
  }

  openModal(object: any, configModal?:ConfigModal) {
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

  activarDesactivarEdicion(indice:number){
    if(this.listaContenidos[indice]["editable"] === false){
      this.listaContenidos[this.posicionContenidoEditado]["editable"] = false;
      this.listaContenidos[indice]["editable"] = true;
    }else{
      this.listaContenidos[indice]["editable"] = false;
    }
    this.getFormControl(this.listaContenidos[indice]);
    this.posicionContenidoEditado = indice;
  }

  getFormControl(contenido:any){
    let id = contenido[this.nombreControlador+"_id"];
    let newLista : any = [];
    for(let i=0; i< this.listaClavesContenido.length; i++){
      const parteValor = contenido[this.listaClavesContenido[i]];
      newLista.push(new FormControl(parteValor));
     
    }
   
    this.listaFormsContol = newLista;
  }

  trackByFuncion(index: number, item: any): any {
    // Devuelve un valor único para cada elemento
    return item[this.nombreControlador+"_id"];
  }

  trackByClave(index: number, clave: string): any {
    // Devuelve la clave como valor único
    return clave;
  }
}

