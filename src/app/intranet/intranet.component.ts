import { Component, OnInit } from '@angular/core';
import { MenuService } from '../core/shared/services/menu/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewModalComponent } from '../core/shared/components/modals/new-modal/new-modal.component';

@Component({
  selector: 'app-intranet',
  templateUrl: './intranet.component.html',
  styleUrls: ['./intranet.component.scss'],
})
export class IntranetComponent  implements OnInit {

  constructor(private menuService:MenuService,
    private modalService: NgbModal) {}

	

  ngOnInit() {
    this.menuService.getMenuDeApi().subscribe({});
  }

}
