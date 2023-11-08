import { TestBed } from '@angular/core/testing';

import { InterpretationService } from './interpretation.service';

describe('InterpretationService', () => {
  let service: InterpretationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterpretationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
