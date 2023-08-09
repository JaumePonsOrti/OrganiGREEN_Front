import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerPlanificacionComponent } from '../ver-planificacion/ver-planificacion.component';
import { VerPlanificacionEnCampoComponent } from './ver-planificacion-en-campo.component';

const routes: Routes = [{
  path:"",
  component: VerPlanificacionEnCampoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerPlanificacionEnCampoRoutingModule { }
