import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConectadoService } from '../../core/shared/services/conectado/conectado.service';


@Component({
  selector: 'app-no-con',
  templateUrl: './no-con.component.html',
  styleUrls: ['./no-con.component.scss'],
})
export class NoConComponent  implements OnInit {

  constructor(private router:Router, private conectada:ConectadoService) { }

  ngOnInit() {}

  clicki(){
    this.conectada.ping().subscribe();
    this.router.navigateByUrl('/');
  }
}
