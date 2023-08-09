import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperInputsAutocompletarTiposSimplesComponent } from './super-inputs-autocompletar-tipos-simples.component';

describe('SuperInputsAutocompletarTiposSimplesComponent', () => {
  let component: SuperInputsAutocompletarTiposSimplesComponent;
  let fixture: ComponentFixture<SuperInputsAutocompletarTiposSimplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperInputsAutocompletarTiposSimplesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperInputsAutocompletarTiposSimplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
