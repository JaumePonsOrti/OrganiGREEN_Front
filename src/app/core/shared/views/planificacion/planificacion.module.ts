import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanificacionRoutingModule } from './planificacion-routing.module';
import { PlanificacionComponent } from './planificacion.component';
import { MenusModule } from "../../components/menus/menus.module";
import { SharedModule } from '../../shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
    declarations: [
        PlanificacionComponent
    ],
    exports: [
        PlanificacionComponent,
        FullCalendarModule
    ],
    imports: [
        CommonModule,
        PlanificacionRoutingModule,
        SharedModule,
        FullCalendarModule 
    ]
})
export class PlanificacionModule { }
