import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineCompletedComponent } from './pipeline-completed.component';

describe('PipelineCompletedComponent', () => {
  let component: PipelineCompletedComponent;
  let fixture: ComponentFixture<PipelineCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineCompletedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PipelineCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
