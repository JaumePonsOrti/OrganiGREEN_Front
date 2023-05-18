import { Component, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { MenuService } from '../../../services/menu/menu.service';
import { Debug } from '../../../helpers/Debug';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent extends Debug {
  constructor(public menuService:MenuService) {
    super(true);
  }
  seeSidebar = true;
  marginLeft =  "";
  openScroll() {
		if (this.seeSidebar) {
      this.seeSidebar = false;
      this.marginLeft =  "ml-0";
    }
    else{
      this.seeSidebar = true;
      this.marginLeft =  "";
      
    }
	}

  ifMayorQue0(item:Array<any>){
    if(typeof item != "undefined"){
      return true;
    }
    return false;
  }

  generarEnlace(menu:any){

    let m = menu.tipo_de_view +"/"+menu.controlador;
  
    return m;
  }
}
