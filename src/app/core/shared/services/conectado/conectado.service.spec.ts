import { TestBed } from '@angular/core/testing';

import { ConectadoService } from './conectado.service';

describe('ConectadoService', () => {
  let service: ConectadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConectadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
