import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAutofocusComponent } from './modal-autofocus.component';

describe('ModalAutofocusComponent', () => {
  let component: ModalAutofocusComponent;
  let fixture: ComponentFixture<ModalAutofocusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAutofocusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAutofocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
