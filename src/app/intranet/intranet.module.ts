import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { SharedModule } from '../core/shared/shared.module';
import { IntranetComponent } from './intranet.component';
import { RouterModule } from '@angular/router';
import { IonRouterOutlet, IonicModule } from '@ionic/angular';
import { PlanificacionModule } from "../core/shared/views/planificacion/planificacion.module";


@NgModule({
    declarations: [IntranetComponent],
    exports: [IntranetComponent],
    imports: [
        CommonModule,
        IntranetRoutingModule,
        SharedModule,
        IonicModule,
         RouterModule
    ]
})
export class IntranetModule { }
