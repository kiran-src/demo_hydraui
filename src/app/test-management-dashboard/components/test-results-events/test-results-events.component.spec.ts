import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultsEventsComponent } from './test-results-events.component';

describe('TestResultsEventsComponent', () => {
  let component: TestResultsEventsComponent;
  let fixture: ComponentFixture<TestResultsEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestResultsEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestResultsEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
