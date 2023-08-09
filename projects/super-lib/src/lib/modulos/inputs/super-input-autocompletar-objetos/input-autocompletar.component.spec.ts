import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAutocompletarComponent } from './input-autocompletar.component';

describe('InputAutocompletarComponent', () => {
  let component: InputAutocompletarComponent;
  let fixture: ComponentFixture<InputAutocompletarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAutocompletarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputAutocompletarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
