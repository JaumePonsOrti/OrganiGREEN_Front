import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-deshacer-match',
  templateUrl: './modal-deshacer-match.component.html',
  styleUrls: ['./modal-deshacer-match.component.scss']
})
export class ModalDeshacerMatchComponent implements OnInit {

  @Input() name!:string;

	constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

  
}
