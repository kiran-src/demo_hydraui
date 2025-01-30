import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelinePredictiveAnalyticsComponent } from './pipeline-predictive-analytics.component';

describe('PipelinePredictiveAnalyticsComponent', () => {
  let component: PipelinePredictiveAnalyticsComponent;
  let fixture: ComponentFixture<PipelinePredictiveAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelinePredictiveAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PipelinePredictiveAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
