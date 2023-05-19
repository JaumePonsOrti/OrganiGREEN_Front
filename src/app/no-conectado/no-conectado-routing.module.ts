import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoConectadoComponent } from './no-conectado.component';

const routes: Routes = [
  {path:'',component:NoConectadoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoConectadoRoutingModule { }
