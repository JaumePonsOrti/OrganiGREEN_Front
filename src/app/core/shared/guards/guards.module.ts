import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './login.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  
  ],exports:[
  ],
   providers:[
    AuthGuard,
    LoginGuard
  ]
})
export class GuardsModule { }
