import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanificacionProductosRoutingModule } from './planificacion-productos-routing.module';
import { PlanificacionProductosComponent } from './planificacion-productos.component';
import { NewCrudModule } from 'src/app/core/shared/views/new-crud/crud.module';
import { InputsModule } from 'projects/super-lib/src/public-api';
import { SharedModule } from 'src/app/core/shared/shared.module';


@NgModule({
  declarations: [PlanificacionProductosComponent],
  imports: [
    CommonModule,
    PlanificacionProductosRoutingModule,
    NewCrudModule,
    InputsModule,
    
  ]
})
export class PlanificacionProductosModule { }
