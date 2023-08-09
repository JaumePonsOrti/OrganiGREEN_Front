import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerPlanificacionEnCampoComponent } from './ver-planificacion-en-campo.component';

describe('VerPlanificacionEnCampoComponent', () => {
  let component: VerPlanificacionEnCampoComponent;
  let fixture: ComponentFixture<VerPlanificacionEnCampoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPlanificacionEnCampoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerPlanificacionEnCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
