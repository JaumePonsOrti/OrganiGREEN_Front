import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputAutocompletarComponent } from './super-input-autocompletar-objetos/input-autocompletar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SuperInputsAutocompletarTiposSimplesComponent } from './super-inputs-autocompletar-tipos-simples/super-inputs-autocompletar-tipos-simples.component';


@NgModule({
  declarations: [
    InputAutocompletarComponent,
    SuperInputsAutocompletarTiposSimplesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    MatAutocompleteModule
  ],
  exports: [ 
    InputAutocompletarComponent,
    FormsModule,
    ReactiveFormsModule, 
    MatAutocompleteModule,
    SuperInputsAutocompletarTiposSimplesComponent

  ]
})
export class InputsModule { }
