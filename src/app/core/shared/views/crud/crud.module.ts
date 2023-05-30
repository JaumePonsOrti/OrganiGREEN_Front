import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    CrudComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule, 
    ComponentsModule
  ],
  exports:[
    CrudComponent
  ]
})
export class CrudModule { }
