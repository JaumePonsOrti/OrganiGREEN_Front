import { TestBed } from '@angular/core/testing';

import { NoConectadoGuard } from './no-conectado.guard';

describe('NoConectadoGuard', () => {
  let guard: NoConectadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoConectadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
