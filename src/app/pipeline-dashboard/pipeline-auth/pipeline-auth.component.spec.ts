import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineAuthComponent } from './pipeline-auth.component';

describe('PipelineAuthComponent', () => {
  let component: PipelineAuthComponent;
  let fixture: ComponentFixture<PipelineAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PipelineAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
