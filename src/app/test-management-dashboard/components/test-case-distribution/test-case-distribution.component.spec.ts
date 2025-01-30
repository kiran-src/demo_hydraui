import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseDistributionComponent } from './test-case-distribution.component';

describe('TestCaseDistributionComponent', () => {
  let component: TestCaseDistributionComponent;
  let fixture: ComponentFixture<TestCaseDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCaseDistributionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestCaseDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
