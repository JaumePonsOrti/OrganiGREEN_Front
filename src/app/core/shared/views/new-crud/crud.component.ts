import { Component, OnInit, Output, Input, OnChanges, SimpleChanges,EventEmitter } from '@angular/core';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { UniversalService } from '../../services/universal/universal.service';
import { 
  NgbModal 
} from '@ng-bootstrap/ng-bootstrap';
import { ModalAutofocusComponent } from '../../components/modals/modal-autofocus/modal-autofocus.component';
import { HashService } from '../../services/crytp/hash.service';
import { FormControl } from '@angular/forms';
import { ConfigModal } from '../../models/configModal';
import { MenuService } from '../../services/menu/menu.service';
import { UsuariosService } from '../../services/usuarios/usuarios.service';
import { IFormConfig } from 'projects/super-lib/src/lib/modulos/formularios/form_Config';
import { Convertidor_Tipos } from '../../helpers/Convertidor_tipos.helper';
import { ICrudConfig } from './models/ICrudConfig';



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
  @Input() listaContenidos:any = [];
  /*
  * @deprecated Por favor utiliza crud CONFIG DE AHORA EN adelante
  */
  @Input() config_form: IFormConfig[] = [];
  @Input() crudConfig:ICrudConfig = {
    can_agregar:false,
    can_ver:false,
    can_dataPicker: false,
    config_super_table:{
      canDelete: false,
      canEdit: false,
    }
  };
  @Output () añadido = new EventEmitter();
  @Input() headerArrayTable: any[] = [];
  @Output() fechaCambiada = new EventEmitter();
  peticionBD:boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if(typeof this.listaContenidos !== "undefined" && this.listaContenidos.length>0){
      this.listaContenidos = this.listaContenidos;
      this.editar();
      if(typeof this.crudConfig.campo_por_el_que_agrupar !== "undefined"){
       // alert();
        let date = new Date();
        this.agrupar();
        /*
        let date2 = new Date(date.getFullYear() + "-"+(date.getMonth()+1 )+ "-"+date.getDate()+ " 00:00:00:UTC").toJSON();
        this.agrupadoParaMostrar = this.agrupacion[date2]?? [];
        */
       this.agrupadoParaMostrar = this.listaContenidos;
      } 

      console.log(this.agrupacion);
    }
    
    
    this.formControl.valueChanges.subscribe({
      next:(date:any) =>{ 
      
        this.agrupadoParaMostrar = this.agrupacion[date]  ?? [];
        this.fechaCambiada.emit(date);

      }
    });

  }

  public agrupadoParaMostrar:any;

  ngOnInit() {

    if(typeof this.listaContenidos !== "undefined" && this.listaContenidos.length>0){
      this.listaContenidos = this.listaContenidos;
      this.editar();

      if(typeof this.crudConfig.campo_por_el_que_agrupar !== "undefined"){
        alert("En init");
        this.agrupar();
      }

    }

  }
  
  private agrupar(){
    
    for (let i = 0; i < this.listaContenidos.length; i++){
      const element = this.listaContenidos[i];
      if(this.crudConfig.campo_por_el_que_agrupar){
        let data = element[this.crudConfig.campo_por_el_que_agrupar?.nombre_campo];
        if(typeof this.agrupacion[data] === "undefined"){
          this.agrupacion[data] = [element];
          this.listaDeIndices.push(data);
        }else {
          this.agrupacion[data].push(element);
        }
        switch (this.crudConfig.campo_por_el_que_agrupar?.nombre_controler) {
          case "date_picker" || "date_selector":
            
            if(typeof this.agrupacion[data] === "undefined"){
              this.agrupacion[data] = [element];
              this.listaDeIndices.push(data);
            }else {
              this.agrupacion[data].push(element);
            }
            break;
        
          default:
            break;
        }
        
      }
      
    }
  }

  formControl: FormControl = new FormControl();

  public listaDeIndices: string[] = [];
  public indiceActual: number =0;
  public agrupacion:any = {};
 

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
   // console.log(object.object);
    let keys: string[] = Object.keys(object.object);
    //console.log(keys);
    this.universalService.request(this.nombreControlador, "borrar", object.object[this.nombreControlador+"_id"]).subscribe(
      {
        next: (response) => {
          alert("Eliminado correctamente");
          delete this.listaContenidos[object.i];
          this.listaContenidos = this.listaContenidos.filter((item: any) => typeof item  != "undefined" );
         console.log("lista despues de borrar",this.listaContenidos);
         switch (this.informacionFiltrada) {
          case true:
            this.filtrarInformacion();
            break;
          case false:
            this.noFiltrarInformacion();
            break;
          default:
            break;
         }
        //alert("Eliminado correctamente y borrado de la lista");
        },
        error: (error) => {
          alert("Error al borrar. Recarga la pagina si no se hace automáticamente");
          window.location.reload();
        },
      }
    );
    
  }

  ejecuta(o:any,funcion:any) {
    console.log("Objeto al entrar: ",o);
    let obcion = "";
    o =  Object.assign({},o);

    let sePuedeEjecutar : boolean = true;
    switch (funcion) {
      case "crear":
        let oCopy = Object.assign({},o);
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
        if(typeof this.crudConfig.modificar_objeto_posteriormente === "undefined" || this.crudConfig.modificar_objeto_posteriormente === false){
          this.listaContenidos.push(oCopy);
          console.log("o añadido:",o);
          console.log("ocopy :",oCopy);
        }
        
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

        if(this.nombreControlador == "planificacion"){
          o.planificacion_fecha_realizar = new Date( o.planificacion_fecha_realizar).toJSON();

        }
       
        break;
      default:
        break;
    }
    
    
    if(sePuedeEjecutar === true){
      let oCopy = Object.assign({},o);
      delete oCopy["editable"];
      let oRef:any =this.crudConfig.objeto_referencia?? Object.assign({},this.listaContenidos[0]);
      
      delete oCopy[this.nombreControlador+"_id"];
      delete oRef[this.nombreControlador+"_id"];
      delete oRef["editable"];
 
      oCopy = Convertidor_Tipos.convertObject(oRef,o);
      this.universalService.request(this.nombreControlador, funcion,obcion,oCopy).subscribe(
        {
          next : (response:any) => {
           
            if(this.crudConfig.modificar_objeto_posteriormente == undefined || this.crudConfig.modificar_objeto_posteriormente === false){
              let o2 = this.listaContenidos[this.listaContenidos.length - 1];
              this.listaContenidos[this.listaContenidos.length - 1]["editable"] = false;
              this.listaContenidos[this.listaContenidos.length - 1][this.nombreControlador+"_id"] = response[this.nombreControlador+"_id"];
              alert("Se han efectuado los cambios correctamente correctamente.");
            }
           
            this.añadido.emit(response);
          },
          error : (error) => {
            let mensaje:string ="Error al Crear/Editar. "+
            "Si estas intentando editar un usuario vuelve a crear otro nuevo, elimina el antiguo y cierra sesion si no se hace automaticamente automaticamente con la nu.Recarga la pagina si no se hace automáticamente.";
            if(this.nombreControlador !== "usuario") {
              mensaje ="Error al Crear/Editar. " +
              "Si estas intentando editar y da error elimina y vuelve a crear. " +
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

 informacionFiltrada: boolean = false;
  filtrarInformacion(){
    this.informacionFiltrada = true;
    let date = new Date();
    let date2 = new Date(date.getFullYear() + "-"+(date.getMonth()+1 )+ "-"+date.getDate()+ " 00:00:00:UTC").toJSON();
    //alert(date2);
    this.agrupadoParaMostrar = this.agrupacion[date2]?? [];
  }

  noFiltrarInformacion(){
    this.informacionFiltrada = false;
    this.agrupadoParaMostrar = this.listaContenidos;
  }
}

