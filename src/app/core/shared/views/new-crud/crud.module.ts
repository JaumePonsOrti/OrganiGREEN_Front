import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CrudComponent } from './crud.component';

import { IonicModule } from '@ionic/angular';
import { MenusModule } from 'src/app/core/shared/components/menus/menus.module';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    CrudComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    
  ],
  exports:[
    CrudComponent
  ]
})
export class CrudModule { }
