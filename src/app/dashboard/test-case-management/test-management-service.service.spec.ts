import { TestBed } from '@angular/core/testing';

import { TestManagementServiceService } from './test-management-service.service';

describe('TestManagementServiceService', () => {
  let service: TestManagementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestManagementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
