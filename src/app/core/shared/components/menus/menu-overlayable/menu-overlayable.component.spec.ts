import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOverlayableComponent } from './menu-overlayable.component';

describe('MenuOverlayableComponent', () => {
  let component: MenuOverlayableComponent;
  let fixture: ComponentFixture<MenuOverlayableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuOverlayableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuOverlayableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
