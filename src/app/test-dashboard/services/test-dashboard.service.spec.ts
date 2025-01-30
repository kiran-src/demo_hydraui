import { TestBed } from '@angular/core/testing';

import { TestDashboardService } from './test-dashboard.service';

describe('TestDashboardService', () => {
  let service: TestDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
