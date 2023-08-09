import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsComponent } from './modals.component';
import { ModalAutofocusComponent } from './modal-autofocus/modal-autofocus.component';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeshacerMatchComponent } from './modal-deshacer-match/modal-deshacer-match.component';
import { NewModalComponent } from './new-modal/new-modal.component';
import { ModalComponentComponent } from './modal-crud/modal-component.component';
import { SuperLibModule } from '../../super-lib.module';
import { SuperSidebarsModule } from '../Super-Sidebars/super-sidebars.module';
import { InputsModule } from '../inputs/inputs.module';
import { FormulariosModule } from '../formularios/formularios.module';
import { SuperTablasModule } from '../tablas/tablas.module';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/core/shared/components/components.module';



@NgModule({
  declarations: [
    ModalsComponent,
    ModalAutofocusComponent,
    ModalDeshacerMatchComponent,
    NewModalComponent,
    ModalComponentComponent,
  ],
  imports: [
    CommonModule,
    NgbModalModule,
    CommonModule,
    InputsModule,
    FormulariosModule,
    IonicModule,
    SuperTablasModule
  ],exports:[
    ModalAutofocusComponent,
    NgbModalModule, 
    NewModalComponent,
    ModalComponentComponent,
  ]
})
export class SuperModalsModule { }
