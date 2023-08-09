import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearFormComponent } from './crear-form/crear-form.component';
import { AutocompletarComponent } from './autocompletar/autocompletar.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    DynamicFormComponent,
    CrearFormComponent,
    AutocompletarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent,
    CrearFormComponent, 
    MatAutocompleteModule,
    AutocompletarComponent, 
    

  ]
})
export class MiFormsModule { }
