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

  constructor(rutaActivaLocal: ActivatedRoute,  universalService: UniversalService, private router: Router) { 
    super("margin-left-menu-desplegado", universalService, rutaActivaLocal);
  }

  ngOnInit() {
    this.alInicio();  
  }

  
  


}
