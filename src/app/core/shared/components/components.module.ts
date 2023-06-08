import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MenusModule } from './menus/menus.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from '../services/services.module';
import { AlertsModule } from './alerts/alerts.module';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { NgbCarouselModule, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { BusquedaModule } from './busqueda/busqueda.module';
import { ModalsModule } from './modals/modals.module';
import { IonicModule } from '@ionic/angular';
import { MiFormsModule } from './mi-forms/mi-forms.module';



@NgModule({
  declarations: [
    FooterComponent,
    CarrouselComponent,
  ],
  imports: [
    CommonModule,
    MenusModule,
    ReactiveFormsModule,
    AlertsModule,
    NgbCarouselModule,
    BusquedaModule,
    IonicModule,
    ModalsModule,
    MiFormsModule
  ],
  exports:[
    MenusModule,
    FooterComponent, 
    ReactiveFormsModule,
    NgbCarouselModule,
    CarrouselComponent,
    AlertsModule, 
    BusquedaModule,
    IonicModule,
    ModalsModule, 
    MiFormsModule
  ]
})
export class ComponentsModule { }
