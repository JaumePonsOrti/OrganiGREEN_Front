import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { MenusModule } from '../../components/menus/menus.module';


@NgModule({
  declarations: [
    CrudComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule,
    MenusModule
  ],
  exports:[
    CrudComponent
  ]
})
export class CrudModule { }
