import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/shared/guards/auth/auth.guard';
import { LoginGuard } from './core/shared/guards/login.guard';
import { NoConComponent } from './home/no-con/no-con.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
   
  },
  {
    path: "intranet",
    loadChildren: () => import('./intranet/intranet.module').then(m => m.IntranetModule),
    //canActivate: [AuthGuard]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
