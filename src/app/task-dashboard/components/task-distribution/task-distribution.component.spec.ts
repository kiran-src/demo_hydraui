import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDistributionComponent } from './task-distribution.component';

describe('TaskDistributionComponent', () => {
  let component: TaskDistributionComponent;
  let fixture: ComponentFixture<TaskDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDistributionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
