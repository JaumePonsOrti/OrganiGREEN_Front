import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoConectadoComponent } from './no-conectado.component';



@NgModule({
  declarations: [NoConectadoComponent],
  imports: [
    CommonModule,

  ],exports:[NoConectadoComponent]
})
export class NoConectadoModule { }
