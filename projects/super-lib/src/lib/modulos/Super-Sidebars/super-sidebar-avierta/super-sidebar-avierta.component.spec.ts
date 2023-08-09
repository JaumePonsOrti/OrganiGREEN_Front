import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperSidebarAviertaComponent } from './super-sidebar-avierta.component';

describe('SuperSidebarAviertaComponent', () => {
  let component: SuperSidebarAviertaComponent;
  let fixture: ComponentFixture<SuperSidebarAviertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperSidebarAviertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperSidebarAviertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
