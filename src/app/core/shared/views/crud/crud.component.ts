import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent  implements OnInit {

  constructor(public rutaActiva: ActivatedRoute) { }

  ngOnInit() {}

}
