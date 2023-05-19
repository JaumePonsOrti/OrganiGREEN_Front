import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPublicComponent } from './menu-public/menu-public.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { MenuOverlayableComponent } from './menu-overlayable/menu-overlayable.component';
import { NgbAlertModule, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsModule } from '../alerts/alerts.module';



@NgModule({
  declarations: [
    MenuPublicComponent,
    MenuAdminComponent,
    MenuOverlayableComponent
  ],
  imports: [
    CommonModule,
    NgbAlertModule
  ],
  exports:[
    MenuAdminComponent,
    MenuPublicComponent,
    MenuOverlayableComponent,
    NgbAlertModule
  ]
})
export class MenusModule { }
