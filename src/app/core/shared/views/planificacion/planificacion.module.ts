import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanificacionRoutingModule } from './planificacion-routing.module';
import { PlanificacionComponent } from './planificacion.component';


@NgModule({
  declarations: [
    PlanificacionComponent
  ],
  imports: [
    CommonModule,
    PlanificacionRoutingModule
  ], exports:[
    PlanificacionComponent
  ]

})
export class PlanificacionModule { }
