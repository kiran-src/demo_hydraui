import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineHistoryComponent } from './pipeline-history.component';

describe('PipelineHistoryComponent', () => {
  let component: PipelineHistoryComponent;
  let fixture: ComponentFixture<PipelineHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PipelineHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
