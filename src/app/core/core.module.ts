import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from './shared/services/services.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BearerInterceptor } from './BearerInterceptor';
import { AppKeyInterceptor } from './AppKeyInterceptor';
import { ConectadoService } from './shared/services/conectado/conectado.service';
import { GuardsModule } from './shared/guards/guards.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicesModule, 
  ],
  exports:[
    ServicesModule
  ],providers:[
    { provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor,multi:true},
    {
      provide: HTTP_INTERCEPTORS, useClass: AppKeyInterceptor,multi:true
    },
    ConectadoService
  ]
})
export class CoreModule { }
