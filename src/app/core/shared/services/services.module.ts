import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from './contacto/ContactService';
import { UsuariosService } from './usuarios/usuarios.service';
import { MenuService } from './menu/menu.service';
import { UniversalService } from './universal/universal.service';
import { SesionService } from './sesion/sesion.service';
import { PlanificacionService } from './planificacion.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],exports:[
    HttpClientModule
  ],providers:[
    ContactService,
    UsuariosService,
    MenuService,
    UniversalService, 
    SesionService,
  
  ]
})
export class ServicesModule { }
