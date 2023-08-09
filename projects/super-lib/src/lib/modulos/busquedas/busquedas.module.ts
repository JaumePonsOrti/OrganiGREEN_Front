import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusquedasComponent } from './busquedas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BusquedasComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule
  ], 
  exports:[
    BusquedasComponent
  ]
})
export class BusquedasModule { }
