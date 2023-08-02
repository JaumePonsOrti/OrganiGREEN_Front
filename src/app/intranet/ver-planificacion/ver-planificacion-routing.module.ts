import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerPlanificacionComponent } from './ver-planificacion.component';

const routes: Routes = [{
  path:"",
  component:VerPlanificacionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerPlanificacionRoutingModule { }
