import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from './shared/services/services.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BearerInterceptor } from './BearerInterceptor';
import { AppKeyInterceptor } from './AppKeyInterceptor';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServicesModule

  ],
  exports:[
    
    ServicesModule
  ],providers:[
    { provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor,multi:true},
    {
      provide: HTTP_INTERCEPTORS, useClass: AppKeyInterceptor,multi:true
    }
  ]
})
export class CoreModule { }
