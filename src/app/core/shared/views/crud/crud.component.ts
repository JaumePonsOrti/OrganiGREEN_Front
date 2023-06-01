import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassView } from '../classView';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent extends ClassView implements OnInit {

  constructor(rutaActivaLocal: ActivatedRoute) { 
    super("margin-left-menu-desplegado",rutaActivaLocal);
  }

  ngOnInit() {
    this.alInicio();  
   
  }

  
  


}
