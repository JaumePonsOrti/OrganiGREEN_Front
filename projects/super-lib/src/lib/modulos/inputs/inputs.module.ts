import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputAutocompletarComponent } from './super-input-autocompletar-objetos/input-autocompletar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SuperInputsAutocompletarTiposSimplesComponent } from './super-inputs-autocompletar-tipos-simples/super-inputs-autocompletar-tipos-simples.component';
import { SuperDatapickerComponent } from './super-datapicker/super-datapicker.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    InputAutocompletarComponent,
    SuperInputsAutocompletarTiposSimplesComponent,
    SuperDatapickerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    MatAutocompleteModule,
    NgbDatepickerModule
  ],
  exports: [ 
    InputAutocompletarComponent,
    FormsModule,
    ReactiveFormsModule, 
    MatAutocompleteModule,
    SuperInputsAutocompletarTiposSimplesComponent,
    SuperDatapickerComponent

  ]
})
export class InputsModule { }
