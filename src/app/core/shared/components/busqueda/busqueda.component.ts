import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent  implements OnInit {
  @Input() controlador: string = "";
  constructor() { }

  ngOnInit() {}

}
