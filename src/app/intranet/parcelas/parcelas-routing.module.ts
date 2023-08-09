import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParcelasComponent } from './parcelas.component';

const routes: Routes = [
  {path:"", component: ParcelasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParcelasRoutingModule { }
