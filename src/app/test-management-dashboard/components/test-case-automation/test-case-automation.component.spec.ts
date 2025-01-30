import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCaseAutomationComponent } from './test-case-automation.component';

describe('TestCaseAutomationComponent', () => {
  let component: TestCaseAutomationComponent;
  let fixture: ComponentFixture<TestCaseAutomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCaseAutomationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestCaseAutomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
