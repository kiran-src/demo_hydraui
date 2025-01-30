import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRunsTimelineComponent } from './test-runs-timeline.component';

describe('TestRunsTimelineComponent', () => {
  let component: TestRunsTimelineComponent;
  let fixture: ComponentFixture<TestRunsTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRunsTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestRunsTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
