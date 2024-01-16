import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { GuardsModule } from './core/shared/guards/guards.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuService } from './core/shared/services/menu/menu.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule, 
     NgbModule,
     CoreModule,
     GuardsModule,
     BrowserAnimationsModule,
     
    ],
  providers: [{
     provide: RouteReuseStrategy, useClass: IonicRouteStrategy, 
    },
    MenuService
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
