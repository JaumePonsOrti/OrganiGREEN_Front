import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    
  ], exports:
  [
    CommonModule,
    ComponentsModule
  ]
})
export class SharedModule { }
