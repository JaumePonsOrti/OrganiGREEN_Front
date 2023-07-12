import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsComponent } from './modals.component';
import { ModalAutofocusComponent } from './modal-autofocus/modal-autofocus.component';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeshacerMatchComponent } from './modal-deshacer-match/modal-deshacer-match.component';
import { NewModalComponent } from './new-modal/new-modal.component';



@NgModule({
  declarations: [
    ModalsComponent,
    ModalAutofocusComponent,
    ModalDeshacerMatchComponent,
    NewModalComponent
  ],
  imports: [
    CommonModule,
    NgbModalModule
  ],exports:[
    ModalAutofocusComponent,
    NgbModalModule, 
    NewModalComponent
  ]
})
export class SuperModalsModule { }
