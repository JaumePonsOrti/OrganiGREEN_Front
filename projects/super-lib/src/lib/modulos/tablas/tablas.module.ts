import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperTablaComponent } from './super-tabla/super-tabla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SuperTablaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    SuperTablaComponent
  ]
})
export class SuperTablasModule { }
