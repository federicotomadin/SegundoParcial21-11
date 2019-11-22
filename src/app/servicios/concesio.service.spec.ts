import { TestBed } from '@angular/core/testing';

import { ConcesioService } from './concesio.service';

describe('ConcesioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConcesioService = TestBed.get(ConcesioService);
    expect(service).toBeTruthy();
  });
});
