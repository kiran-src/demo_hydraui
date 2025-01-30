import { TestBed } from '@angular/core/testing';

import { TaskDashboardService } from './task-dashboard.service';

describe('TaskDashboardService', () => {
  let service: TaskDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
