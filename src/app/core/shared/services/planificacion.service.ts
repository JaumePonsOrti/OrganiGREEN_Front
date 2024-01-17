import { Injectable } from '@angular/core';   
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class PlanificacionService{
  private miDato = new BehaviorSubject<any>(undefined);
  public planificacion = this.miDato.asObservable();

  constructor() { }

  cambiarDato(dato: any) {
    this.miDato.next(dato);
  }
  resetDato(){
    this.miDato = new BehaviorSubject<any>(undefined);
    this.planificacion = this.miDato.asObservable();  
  }
}