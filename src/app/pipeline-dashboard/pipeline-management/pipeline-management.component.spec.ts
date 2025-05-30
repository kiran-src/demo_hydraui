import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineManagementComponent } from './pipeline-management.component';

describe('PipelineManagementComponent', () => {
  let component: PipelineManagementComponent;
  let fixture: ComponentFixture<PipelineManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PipelineManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
