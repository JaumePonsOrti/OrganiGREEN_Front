import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanificacionModule } from './planificacion/planificacion.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    PlanificacionModule
  ],
  exports: [
    PlanificacionModule
  ]
})
export class ViewsModule { }
