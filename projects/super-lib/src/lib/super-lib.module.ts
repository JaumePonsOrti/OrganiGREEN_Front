import { NgModule } from '@angular/core';
import { SuperLibComponent } from './super-lib.component';
import { SuperSidebarAviertaComponent } from './modulos/Super-Sidebars/super-sidebar-avierta/super-sidebar-avierta.component';
import { SuperTablaComponent } from './modulos/tablas/super-tabla/super-tabla.component';
import { SuperTablasModule } from './modulos/tablas/tablas.module';



@NgModule({
  declarations: [
    SuperLibComponent,
  ],
  imports: [
    SuperTablasModule
  ],
  exports: [
    SuperLibComponent,
    SuperTablasModule
  ]
})
export class SuperLibModule { }
