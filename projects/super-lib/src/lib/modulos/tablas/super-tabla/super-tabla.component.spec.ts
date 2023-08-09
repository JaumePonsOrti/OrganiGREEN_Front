import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperTablaComponent } from './super-tabla.component';

describe('SuperTablaComponent', () => {
  let component: SuperTablaComponent;
  let fixture: ComponentFixture<SuperTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperTablaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
