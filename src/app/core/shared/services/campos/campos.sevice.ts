import { Injectable } from '@angular/core';   
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class CamposService{
  private miDato = new BehaviorSubject<any>(undefined);
  public campo = this.miDato.asObservable();

  constructor() { }

  cambiarDato(dato: any) {
    this.miDato.next(dato);
  }
}