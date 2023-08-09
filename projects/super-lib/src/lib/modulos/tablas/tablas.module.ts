import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperTablaComponent } from './super-tabla/super-tabla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '../inputs/inputs.module';



@NgModule({
  declarations: [
    SuperTablaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule
  ],
  exports:[
    SuperTablaComponent
  ]
})
export class SuperTablasModule { }
