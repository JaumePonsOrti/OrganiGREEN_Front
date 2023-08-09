import { Component, HostListener } from "@angular/core";
@Component({
    selector: 'app-Escaler',
    template: '',
    styles: ['']
  })
export class Escaler {
    images!: any;
	width!:any;
	height!:any;
	linkFotos!:string;
	

	@HostListener('window:resize', [])
  	onResize() {
    	this.updateSizes();
		
  	} 
      isMenuOpen = false;
	updateSizes(){
		this.width = window.innerWidth;
		this.height = window.innerHeight;
        this.isMenuOpen = false;
		this.images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/${this.width}/${this.height}`);
	}
}