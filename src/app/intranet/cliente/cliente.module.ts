import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { SuperLibModule } from 'projects/super-lib/src/public-api';
import { SharedModule } from 'src/app/core/shared/shared.module';


@NgModule({
  declarations: [ClienteComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SuperLibModule,
    SharedModule
  ], 
  exports: [ClienteComponent]
})
export class ClienteModule { }
