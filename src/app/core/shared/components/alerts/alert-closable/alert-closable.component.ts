import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlertConfig } from '../Models/AlerConfig';



@Component({
	selector: 'app-alert-closable',
	templateUrl: './alert-closable.component.html',
	styleUrls: ['./alert-closable.component.scss'],
	providers: [NgbAlertConfig]
})
export class AlertClosableComponent implements OnChanges {

	@Input() config!: AlertConfig;
	@Input() show:boolean = false;
	@Output() close = new EventEmitter<boolean>();

	constructor(alertConfig: NgbAlertConfig) {
		this.config = {
			type: "submit",
			message: "Se ha guardado correctamente",
			timer: 0
		};
		alertConfig.dismissible = true;
	}
	ngOnChanges(changes:SimpleChanges): void {
		// Aquí actualizas el estado del alert según el objeto AlertConfig
		// Ejemplo:
		console.log("Abro alert");
		if (changes['config'] && !changes['config'].firstChange) {
			this.show = true;
			this.close.emit(true);
			if (this.config.timer && this.config.timer > 0) {
			  setTimeout(() => {
				this.show = false;
				this.close.emit(false);
			  }, this.config.timer);
			}
		}
		
	}

	closeAlert() {
		this.close.emit(true);
		if (this.config.timer && this.config.timer > 0) {
			setTimeout(() => {
				this.show = false;
				this.close.emit(false);
			}, this.config.timer);
		}
	}
}