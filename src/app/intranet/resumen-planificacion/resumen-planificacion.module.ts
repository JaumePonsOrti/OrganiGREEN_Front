import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumenPlanificacionRoutingModule } from './resumen-planificacion-routing.module';
import { ResumenPlanificacionComponent } from './resumen-planificacion.component';
import { NewCrudModule } from 'src/app/core/shared/views/new-crud/crud.module';
import { FormulariosModule, InputsModule, SuperLibModule, SuperSidebarsModule } from 'projects/super-lib/src/public-api';
import { IonicModule } from '@ionic/angular';
import { SuperTablasModule } from 'projects/super-lib/src/lib/modulos/tablas/tablas.module';
import { SharedModule } from 'src/app/core/shared/shared.module';


@NgModule({
  declarations: [ResumenPlanificacionComponent],
  imports: [
    CommonModule,
    ResumenPlanificacionRoutingModule,
    NewCrudModule,
    InputsModule,
    SuperLibModule,
    SharedModule,
    SuperSidebarsModule,
    InputsModule,
    FormulariosModule,
    SuperTablasModule,
    IonicModule
    
  ],
  exports:[
    ResumenPlanificacionComponent
  ]
})
export class ResumenPlanificacionModule { }
