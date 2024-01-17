import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanificacionProductosComponent } from './planificacion-productos.component';

const routes: Routes = [
  {
    path:"",
    component: PlanificacionProductosComponent
  },
  {
    path:":id",
    component: PlanificacionProductosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanificacionProductosRoutingModule { }
