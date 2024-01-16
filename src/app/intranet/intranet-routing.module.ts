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
    path: "cliente",
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule),
  },
  {
    path: "campo",
    loadChildren: () => import('./campos/campos.module').then(m => m.CamposModule),
  },
  {
    path: "parcela",
    loadChildren: () => import('./parcelas/parcelas.module').then(m => m.ParcelasModule),
  },
  {
    path: "usuario",
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: "producto",
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosModule)
  },
  {
    path:"planificacion",
    loadChildren: () =>  import('./planificacion/planificacion.module').then(m => m.PlanificacionModule)
  }, 
  {
    path:"planificacion_producto",
    loadChildren: () => import('./planificacion-productos/planificacion-productos.module').then(m=> m.PlanificacionProductosModule)
  },
  {
    path:"ver-planificacion",
    loadChildren:()=> import('./ver-planificacion/ver-planificacion.module').then(m => m.VerPlanificacionModule)
  },
  {
    path:"ver-planificacion-en-campo",
    loadChildren:()=> import('./ver-planificacion-en-campo/ver-planificacion-en-campo.module').then(m => m.VerPlanificacionEnCampoModule)
  },
  {
    path:"resumen-planificacion",
    loadChildren:()=> import('./resumen-planificacion/resumen-planificacion.module').then(m=>m.ResumenPlanificacionModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule { }
