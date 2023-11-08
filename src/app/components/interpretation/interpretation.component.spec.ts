import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpretationComponent } from './interpretation.component';

describe('InterpretationComponent', () => {
  let component: InterpretationComponent;
  let fixture: ComponentFixture<InterpretationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterpretationComponent]
    });
    fixture = TestBed.createComponent(InterpretationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
