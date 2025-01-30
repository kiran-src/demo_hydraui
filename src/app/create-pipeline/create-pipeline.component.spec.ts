import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePipelineComponent } from './create-pipeline.component';

describe('CreatePipelineComponent', () => {
  let component: CreatePipelineComponent;
  let fixture: ComponentFixture<CreatePipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePipelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
