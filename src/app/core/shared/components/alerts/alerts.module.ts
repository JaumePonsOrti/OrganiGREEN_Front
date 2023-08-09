import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertClosableComponent } from './alert-closable/alert-closable.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AlertClosableComponent
  ],
  imports: [
    CommonModule,
    NgbAlertModule
  ],exports: [
    AlertClosableComponent,
    NgbAlertModule
  ]
})
export class AlertsModule { }
