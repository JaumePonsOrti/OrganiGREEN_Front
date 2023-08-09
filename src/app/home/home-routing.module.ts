import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { LoginGuard } from '../core/shared/guards/login.guard';
import { AuthGuard } from '../core/shared/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate:[LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}