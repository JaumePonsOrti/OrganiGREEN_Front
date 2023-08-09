import { Component, HostListener, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit{
	showNavigationArrows = false;
	showNavigationIndicators = false;
    
 
	constructor(config: NgbCarouselConfig) {
		// customize default values of carousels used by this component tree
		config.interval = 10000;
		config.wrap = false;
		config.keyboard = false;
		config.pauseOnHover = false;
		//this.showNavigationArrows = true;
		this.showNavigationIndicators = true;
	}
	ngOnInit(): void {
		this.updateSizes();
	 }
	images!: any;
	width!:any;
	height!:any;
	linkFotos!:string;
	

	@HostListener('window:resize', [])
  	onResize() {
    	this.updateSizes();
		
  	} 

	updateSizes(){
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/${this.width}/${this.height}`);
	}
	
}
