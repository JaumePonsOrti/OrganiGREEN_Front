import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearFormComponent } from './crear-form/crear-form.component';



@NgModule({
  declarations: [
    DynamicFormComponent,
    CrearFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent,
    CrearFormComponent
  ]
})
export class MiFormsModule { }
