import { TestBed } from '@angular/core/testing';

import { SuperLibService } from './super-lib.service';

describe('SuperLibService', () => {
  let service: SuperLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
