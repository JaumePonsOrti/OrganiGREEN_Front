import { Component, OnInit } from '@angular/core';
import { MenuService } from '../core/shared/services/menu/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewModalComponent } from '../core/shared/components/modals/new-modal/new-modal.component';
import { UsuariosService } from '../core/shared/services/usuarios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intranet',
  templateUrl: './intranet.component.html',
  styleUrls: ['./intranet.component.scss'],
})
export class IntranetComponent  implements OnInit {

  constructor(
    public menuService:MenuService,
    private modalService: NgbModal,
    private usuario:UsuariosService,
    private router:Router
  ) {}

	

  ngOnInit() {
    this.menuService.getMenuDeApi().subscribe({});
  }

  cerrarSesion() { 
  
    this.usuario.cerrarSesion();
    this.router.navigateByUrl('/');
  }
}
