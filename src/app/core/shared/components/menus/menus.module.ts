import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPublicComponent } from './menu-public/menu-public.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { MenuOverlayableComponent } from './menu-overlayable/menu-overlayable.component';
import { NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    MenuPublicComponent,
    MenuAdminComponent,
    MenuOverlayableComponent
  ],
  imports: [
    CommonModule,
    
  ],
  exports:[
    MenuAdminComponent,
    MenuPublicComponent,
    MenuOverlayableComponent
  ]
})
export class MenusModule { }
