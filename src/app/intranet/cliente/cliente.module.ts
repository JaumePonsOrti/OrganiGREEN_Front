import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { FormulariosModule, InputsModule, SuperLibModule, SuperSidebarsModule } from 'projects/super-lib/src/public-api';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { SuperMenusModule } from 'projects/super-lib/src/lib/modulos/menus/menus.module';


@NgModule({
  declarations: [ClienteComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SuperLibModule,
    SharedModule,
    InputsModule,
    FormulariosModule,
    SuperSidebarsModule
  ], 
  exports: [ClienteComponent]
})
export class ClienteModule { }
