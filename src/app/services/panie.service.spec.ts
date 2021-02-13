import { TestBed } from '@angular/core/testing';

import { PanieService } from './panie.service';

describe('PanieService', () => {
  let service: PanieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
