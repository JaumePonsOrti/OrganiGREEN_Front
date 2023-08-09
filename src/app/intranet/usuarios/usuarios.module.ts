import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { FormulariosModule, InputsModule, SuperLibModule, SuperSidebarsModule } from 'projects/super-lib/src/public-api';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { SuperTablasModule } from 'projects/super-lib/src/lib/modulos/tablas/tablas.module';
import { IonicModule } from '@ionic/angular';
import { NewCrudModule } from 'src/app/core/shared/views/new-crud/crud.module';


@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SuperLibModule,
    SharedModule,
    SuperSidebarsModule,
    InputsModule,
    FormulariosModule,
    SuperTablasModule,
    IonicModule,
    NewCrudModule
  ],exports:[
    UsuariosComponent
  ]
})
export class UsuariosModule { }
