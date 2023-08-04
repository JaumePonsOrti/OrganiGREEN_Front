import { Component, OnInit } from '@angular/core';
import { ICabezeraDesplegableConfig, ISuperDesplegableConfig, ISuperTableDesplegableConfig } from 'projects/super-lib/src/lib/modulos/super-desplegable/super-desplegable/model/IDesplegableConfig';
import { SuperDesplegableConfig } from 'projects/super-lib/src/lib/modulos/super-desplegable/super-desplegable/super-desplegable.component';
import { MenuService } from 'src/app/core/shared/services/menu/menu.service';
import { UniversalService } from 'src/app/core/shared/services/universal/universal.service';

@Component({
  selector: 'app-ver-planificacion',
  templateUrl: './ver-planificacion.component.html',
  styleUrls: ['./ver-planificacion.component.scss'],
})
export class VerPlanificacionComponent  implements OnInit {
  
 

  constructor(public universalService:UniversalService) { }


 
 
// listas de objetos
 
 public configs:SuperDesplegableConfig[] = [];

  ngOnInit() {
    this.universalService.request("ver_planificacion","ver", "todos").subscribe(
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
