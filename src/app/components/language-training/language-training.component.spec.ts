import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTrainingComponent } from './language-training.component';

describe('LanguageTrainingComponent', () => {
  let component: LanguageTrainingComponent;
  let fixture: ComponentFixture<LanguageTrainingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageTrainingComponent]
    });
    fixture = TestBed.createComponent(LanguageTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
