import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperSidebarAviertaComponent } from './super-sidebar-avierta/super-sidebar-avierta.component';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbToast, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { BusquedasModule } from '../busquedas/busquedas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SuperSidebarAviertaComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    NgbModule,
    BusquedasModule,
    FormsModule,
    ReactiveFormsModule
  ], exports:[
    SuperSidebarAviertaComponent,
    NgbToastModule
  ]
})
export class SuperSidebarsModule { }
