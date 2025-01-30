import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagementSetupComponent } from './task-management-setup.component';

describe('TaskManagementSetupComponent', () => {
  let component: TaskManagementSetupComponent;
  let fixture: ComponentFixture<TaskManagementSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskManagementSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskManagementSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
