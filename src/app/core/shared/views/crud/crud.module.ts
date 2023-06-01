import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';

import { IonicModule } from '@ionic/angular';
import { MenusModule } from 'src/app/core/shared/components/menus/menus.module';


@NgModule({
  declarations: [
    CrudComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule,
    MenusModule,
    IonicModule
  ],
  exports:[
    CrudComponent
  ]
})
export class CrudModule { }
