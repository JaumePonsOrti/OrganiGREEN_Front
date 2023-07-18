import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParcelasRoutingModule } from './parcelas-routing.module';
import { ParcelasComponent } from './parcelas.component';


@NgModule({
  declarations: [
    ParcelasComponent
  ],
  imports: [
    CommonModule,
    ParcelasRoutingModule
  ]
})
export class ParcelasModule { }
