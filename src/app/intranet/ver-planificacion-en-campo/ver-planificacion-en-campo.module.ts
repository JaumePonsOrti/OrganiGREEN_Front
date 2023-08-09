import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerPlanificacionEnCampoRoutingModule } from './ver-planificacion-en-campo-routing.module';
import { VerPlanificacionEnCampoComponent } from './ver-planificacion-en-campo.component';
import { DesplegableModule } from 'src/app/core/shared/views/desplegable/desplegable.module';


@NgModule({
  declarations: [VerPlanificacionEnCampoComponent],
  imports: [
    CommonModule,
    VerPlanificacionEnCampoRoutingModule,
    DesplegableModule
  ]
})
export class VerPlanificacionEnCampoModule { }
