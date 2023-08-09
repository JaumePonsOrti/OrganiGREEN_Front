import { Component, OnInit } from '@angular/core';
import { SuperDesplegableConfig } from 'projects/super-lib/src/lib/modulos/super-desplegable/super-desplegable/super-desplegable.component';
import { UniversalService } from 'src/app/core/shared/services/universal/universal.service';

@Component({
  selector: 'app-ver-planificacion-en-campo',
  templateUrl: './ver-planificacion-en-campo.component.html',
  styleUrls: ['./ver-planificacion-en-campo.component.scss'],
})
export class VerPlanificacionEnCampoComponent  implements OnInit {

  constructor(public universalService:UniversalService) { }

  // listas de objetos
 
 public configs:SuperDesplegableConfig[] = [];

  ngOnInit() {
    this.universalService.request("ver_planificacion_en_campo","ver", "todos").subscribe(
      {
        next:(response:any)=>{
          this.configs = response;
          console.log(this.configs);
        },
        error:(error)=>{

        }
      }
    );
     
  }


}
