import { Component, Input, OnInit } from '@angular/core';
import { ISuperDesplegableConfig } from './model/IDesplegableConfig';

@Component({
  selector: 'super-desplegable',
  templateUrl: './super-desplegable.component.html',
  styleUrls: ['./super-desplegable.component.scss'],
})
export class SuperDesplegableComponent  implements OnInit {

  @Input() public config!: ISuperDesplegableConfig;
  @Input() public profundidad: number = 0;
  public profundidadMaxima:number = 2;
  constructor() { }

  ngOnInit() {}

}
