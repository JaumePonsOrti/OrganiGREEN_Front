import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MenusModule } from './menus/menus.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from '../services/services.module';
import { AlertsModule } from './alerts/alerts.module';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';



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
    NgbCarouselModule
  ],
  exports:[
    MenusModule,
    FooterComponent, 
    ReactiveFormsModule,
    NgbCarouselModule,
    CarrouselComponent,
    AlertsModule
  ]
})
export class ComponentsModule { }
