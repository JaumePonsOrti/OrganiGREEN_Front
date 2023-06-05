import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { IntranetComponent } from './intranet.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../core/shared/components/components.module';


@NgModule({
    declarations: [IntranetComponent],
    
    imports: [
        CommonModule,
        IntranetRoutingModule,
        ComponentsModule,
        RouterModule,
        
    ],exports:
    [
        IntranetComponent
    ]
})
export class IntranetModule { }
