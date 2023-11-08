import { TestBed } from '@angular/core/testing';

import { LanguageTrainingService } from './language-training.service';

describe('LanguageTrainingService', () => {
  let service: LanguageTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
