import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassView } from '../classView';
import { UniversalService } from '../../services/universal/universal.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent extends ClassView implements OnInit {

  constructor(rutaActivaLocal: ActivatedRoute,  universalService: UniversalService, ) { 
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
}
