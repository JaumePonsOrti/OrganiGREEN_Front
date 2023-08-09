import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-autofocus',
  templateUrl: './modal-autofocus.component.html',
  styleUrls: ['./modal-autofocus.component.scss'],
})
export class ModalAutofocusComponent implements OnInit {
  @Input() tittle: string = 'Eliminar imagen';
  @Input() strong1: string = '¿Estas seguro de que quieres elimar esta';
  @Input() spanStrong: string = ' "imagen" ';
  @Input() strong2: string = '?';
  @Input() textoNormal: string =
    ' Esta imagen dejara de estar visible a otros usuarios y sera eliminada permanentemente.';
  @Input() textDanger: string =
    ' Esta operación no puede deshacerse.';
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
