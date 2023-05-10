import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPublicComponent } from './menu-public.component';

describe('MenuPublicComponent', () => {
  let component: MenuPublicComponent;
  let fixture: ComponentFixture<MenuPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
