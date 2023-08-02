import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesplegableComponent } from './desplegable.component';
import { SuperTablasModule } from 'projects/super-lib/src/lib/modulos/tablas/tablas.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { SuperDesplegableModule } from 'projects/super-lib/src/lib/modulos/super-desplegable/super-desplegable.module';
import { SuperSidebarAviertaComponent } from 'projects/super-lib/src/lib/modulos/Super-Sidebars/super-sidebar-avierta/super-sidebar-avierta.component';
import { SuperSidebarsModule } from 'projects/super-lib/src/public-api';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [DesplegableComponent],
  imports: [
    CommonModule,
    SuperSidebarsModule,
    SuperDesplegableModule,
    IonicModule
  ],
  exports:[DesplegableComponent]
})
export class DesplegableModule { }