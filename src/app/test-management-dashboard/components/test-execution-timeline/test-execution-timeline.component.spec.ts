import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestExecutionTimelineComponent } from './test-execution-timeline.component';

describe('TestExecutionTimelineComponent', () => {
  let component: TestExecutionTimelineComponent;
  let fixture: ComponentFixture<TestExecutionTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestExecutionTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestExecutionTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
