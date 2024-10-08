import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../core/shared/shared.module';
import { GuardsModule } from '../core/shared/guards/guards.module';
import { AuthGuard } from '../core/shared/guards/auth/auth.guard';
import { LoginGuard } from '../core/shared/guards/login.guard';
import { NoConectadoModule } from '../no-conectado/no-conectado.module';
import { NoConComponent } from './no-con/no-con.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [
    HomePage,
    NoConComponent
  ], 
  providers:[ 
    AuthGuard,
    LoginGuard,
  ]
})
export class HomePageModule {}
