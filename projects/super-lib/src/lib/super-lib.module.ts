import { NgModule } from '@angular/core';
import { SuperLibComponent } from './super-lib.component';
import { SuperSidebarAviertaComponent } from './modulos/Super-Sidebars/super-sidebar-avierta/super-sidebar-avierta.component';
import { SuperTablaComponent } from './modulos/tablas/super-tabla/super-tabla.component';
import { SuperTablasModule } from './modulos/tablas/tablas.module';
import { SuperModalsModule } from './modulos/modals/modals.module';




@NgModule({
  declarations: [
    SuperLibComponent,
  ],
  imports: [
    SuperTablasModule,
    SuperModalsModule
  ],
  exports: [
    SuperLibComponent,
    SuperTablasModule,
    SuperModalsModule

  ]
})
export class SuperLibModule { }
