import { TestBed } from '@angular/core/testing';

import { TripletsService } from './triplets.service';

describe('TripletsService', () => {
  let service: TripletsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripletsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
