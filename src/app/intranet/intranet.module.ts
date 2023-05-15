import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { SharedModule } from '../core/shared/shared.module';
import { IntranetComponent } from './intranet.component';


@NgModule({
  declarations: [IntranetComponent],
  imports: [
    CommonModule,
    IntranetRoutingModule,
    SharedModule, 
  ], exports:[

  ]
})
export class IntranetModule { }
