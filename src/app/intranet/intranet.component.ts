import { Component, OnInit } from '@angular/core';
import { MenuService } from '../core/shared/services/menu/menu.service';

@Component({
  selector: 'app-intranet',
  templateUrl: './intranet.component.html',
  styleUrls: ['./intranet.component.scss'],
})
export class IntranetComponent  implements OnInit {

  constructor(private menuService:MenuService) { }

  ngOnInit() {
    this.menuService.getMenuDeApi().subscribe({});
  }

}
