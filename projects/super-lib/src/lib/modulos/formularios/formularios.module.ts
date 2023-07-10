import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineFormComponent } from './inline-form/inline-form.component';
import { InputsModule } from '../inputs/inputs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InlineFormComponent
  ],
  imports: [
    CommonModule,
    InputsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    InlineFormComponent
  ]
})
export class FormulariosModule { }
