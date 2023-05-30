import { Component, OnInit } from '@angular/core';
import { ClassView } from '../classView';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent extends ClassView implements OnInit  {

  constructor() {
    super();
   }

  ngOnInit() {
    let ruta = this.rutaActiva.snapshot.paramMap.get("controlador");
    this.nombreControlador = ruta ?? "";
    console.log("nombre:",this.nombreControlador);
  }

}
