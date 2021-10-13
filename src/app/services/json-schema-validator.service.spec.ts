import { TestBed } from '@angular/core/testing';

import { JsonSchemaValidatorService } from './json-schema-validator.service';

describe('JsonSchemaValidatorService', () => {
  let service: JsonSchemaValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonSchemaValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
