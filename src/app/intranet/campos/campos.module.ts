import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamposRoutingModule } from './campos-routing.module';
import { CamposComponent } from './campos.component';
import { FormulariosModule, InputsModule, SuperLibModule, SuperSidebarsModule } from 'projects/super-lib/src/public-api';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { SuperTablasModule } from 'projects/super-lib/src/lib/modulos/tablas/tablas.module';
import { IonicModule } from '@ionic/angular';
import { NewCrudModule } from 'src/app/core/shared/views/new-crud/crud.module';


@NgModule({
  declarations: [CamposComponent],
  imports: [
    CommonModule,
    CamposRoutingModule,
    SuperLibModule,
    SharedModule,
    SuperSidebarsModule,
    InputsModule,
    FormulariosModule,
    SuperTablasModule,
    IonicModule,
    NewCrudModule
  ],exports:[
    CamposComponent
  ]
})
export class CamposModule { }
