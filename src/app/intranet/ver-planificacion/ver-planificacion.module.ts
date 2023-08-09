import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerPlanificacionRoutingModule } from './ver-planificacion-routing.module';
import { VerPlanificacionComponent } from './ver-planificacion.component';
import { DesplegableModule } from 'src/app/core/shared/views/desplegable/desplegable.module';


@NgModule({
  declarations: [VerPlanificacionComponent],
  imports: [
    CommonModule,
    VerPlanificacionRoutingModule,
    DesplegableModule
  ]
})
export class VerPlanificacionModule { }
