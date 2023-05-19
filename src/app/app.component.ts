import { Component, OnDestroy } from '@angular/core';
import { ConectadoService } from './core/shared/services/conectado/conectado.service';
import { Subscription, interval } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
 constructor(private conectadoService: ConectadoService) {
  this.conectadoService.ping().subscribe(() => {});
 }
 
}