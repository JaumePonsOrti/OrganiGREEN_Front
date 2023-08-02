import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerPlanificacionEnCampoRoutingModule } from './ver-planificacion-en-campo-routing.module';
import { VerPlanificacionEnCampoComponent } from './ver-planificacion-en-campo.component';


@NgModule({
  declarations: [VerPlanificacionEnCampoComponent],
  imports: [
    CommonModule,
    VerPlanificacionEnCampoRoutingModule
  ]
})
export class VerPlanificacionEnCampoModule { }
