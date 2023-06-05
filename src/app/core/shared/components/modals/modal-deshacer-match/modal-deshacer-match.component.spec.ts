import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeshacerMatchComponent } from './modal-deshacer-match.component';

describe('ModalDeshacerMatchComponent', () => {
  let component: ModalDeshacerMatchComponent;
  let fixture: ComponentFixture<ModalDeshacerMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeshacerMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeshacerMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
