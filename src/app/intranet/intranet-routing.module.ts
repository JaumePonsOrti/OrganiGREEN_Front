import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntranetComponent } from './intranet.component';
import { AuthGuard } from '../core/shared/guards/auth/auth.guard';

const routes: Routes = [
  {
    path:"",
    component:IntranetComponent
    
    //canActivate: [AuthGuard],
  },
  { 
    path: 'planificar', 
    loadChildren:  ()=> import('../core/shared/views/planificacion/planificacion.module').then(
      m => m.PlanificacionModule
    ),
    
  },
  {
    path:'crud',
    loadChildren:  () => import('../core/shared/views/crud/crud.module'
    ).then(
      m => m.CrudModule
    )
  },     
  {
    path: "cliente",
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
  },
  {
    path: "campo",
    loadChildren: () => import('./campos/campos.module').then(m => m.CamposModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule { }
