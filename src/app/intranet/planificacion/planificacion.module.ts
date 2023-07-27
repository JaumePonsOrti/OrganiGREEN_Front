import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanificacionRoutingModule } from './planificacion-routing.module';
import { PlanificacionComponent } from './planificacion.component';
import { NewCrudModule } from 'src/app/core/shared/views/new-crud/crud.module';
import { InputsModule } from 'projects/super-lib/src/public-api';


@NgModule({
  declarations: [PlanificacionComponent],
  imports: [
    CommonModule,
    PlanificacionRoutingModule,
    NewCrudModule,
    InputsModule
  ],
  exports: [PlanificacionComponent]
})
export class PlanificacionModule { }
