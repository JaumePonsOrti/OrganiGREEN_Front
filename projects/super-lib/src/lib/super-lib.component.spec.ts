import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperLibComponent } from './super-lib.component';

describe('SuperLibComponent', () => {
  let component: SuperLibComponent;
  let fixture: ComponentFixture<SuperLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperLibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
