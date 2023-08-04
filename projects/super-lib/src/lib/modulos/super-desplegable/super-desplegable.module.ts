import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperDesplegableComponent } from './super-desplegable/super-desplegable.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SuperTablasModule } from '../tablas/tablas.module';
import { SuperDesplegableSimpleComponent } from './super-desplegable-simple/super-desplegable.component';



@NgModule({
  declarations: [
    SuperDesplegableComponent,
    SuperDesplegableSimpleComponent
  ],
  imports: [
    CommonModule,
    SuperTablasModule,
    NgbAccordionModule,
  ],
  exports: [
    SuperDesplegableComponent,
    SuperDesplegableSimpleComponent
  ]
})
export class SuperDesplegableModule { }
