import { TestBed } from '@angular/core/testing';

import { TestExecutionService } from './test-execution.service';

describe('TestExecutionService', () => {
  let service: TestExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
