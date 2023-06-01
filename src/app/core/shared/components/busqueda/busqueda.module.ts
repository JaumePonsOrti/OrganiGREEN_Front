import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedaComponent } from './busqueda.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BusquedaComponent
  ]
})
export class BusquedaModule { }
