import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertsModule } from './core/shared/components/alerts/alerts.module';
import { GuardsModule } from './core/shared/guards/guards.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule, 
     NgbModule,
     CoreModule,
     GuardsModule,
    
    ],
  providers: [{
     provide: RouteReuseStrategy, useClass: IonicRouteStrategy, 
    },
   
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
