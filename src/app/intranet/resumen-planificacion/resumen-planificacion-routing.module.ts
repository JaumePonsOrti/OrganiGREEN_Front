import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumenPlanificacionComponent } from './resumen-planificacion.component';

const routes: Routes = [{
  path:"",
  component: ResumenPlanificacionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResumenPlanificacionRoutingModule { }
