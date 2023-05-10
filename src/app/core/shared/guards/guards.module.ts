import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],exports:[
    AuthGuard
  ]
})
export class GuardsModule { }
