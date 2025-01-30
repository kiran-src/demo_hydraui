import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCasePriorityComponent } from './test-case-priority.component';

describe('TestCasePriorityComponent', () => {
  let component: TestCasePriorityComponent;
  let fixture: ComponentFixture<TestCasePriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCasePriorityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestCasePriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
