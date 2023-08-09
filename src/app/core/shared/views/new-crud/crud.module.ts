import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CrudComponent } from './crud.component';

import { IonicModule } from '@ionic/angular';
import { MenusModule } from 'src/app/core/shared/components/menus/menus.module';
import { ComponentsModule } from '../../components/components.module';
import { FormulariosModule, InputsModule, SuperLibModule, SuperSidebarsModule } from 'projects/super-lib/src/public-api';
import { SharedModule } from '../../shared.module';
import { SuperTablasModule } from 'projects/super-lib/src/lib/modulos/tablas/tablas.module';


@NgModule({
  declarations: [
    CrudComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    SuperLibModule,
    SharedModule,
    SuperSidebarsModule,
    InputsModule,
    FormulariosModule,
    SuperTablasModule,
    IonicModule
    
  ],
  exports:[
    CrudComponent
  ]
})
export class NewCrudModule { }
