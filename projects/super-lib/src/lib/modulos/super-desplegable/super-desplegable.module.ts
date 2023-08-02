import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperDesplegableComponent } from './super-desplegable/super-desplegable.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SuperTablasModule } from '../tablas/tablas.module';



@NgModule({
  declarations: [SuperDesplegableComponent],
  imports: [
    CommonModule,
    SuperTablasModule,
    NgbAccordionModule,
  ],
  exports: [
    SuperDesplegableComponent
  ]
})
export class SuperDesplegableModule { }
