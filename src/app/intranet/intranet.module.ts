import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { IntranetComponent } from './intranet.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../core/shared/components/components.module';
import { SuperSidebarsModule } from 'projects/super-lib/src/public-api';


@NgModule({
    declarations: [IntranetComponent],
    
    imports: [
        CommonModule,
        IntranetRoutingModule,
        ComponentsModule,
        RouterModule,
        SuperSidebarsModule
        ],exports:
    [
        IntranetComponent
    ]
})
export class IntranetModule { }
