import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCasesCountComponent } from './test-cases-count.component';

describe('TestCasesCountComponent', () => {
  let component: TestCasesCountComponent;
  let fixture: ComponentFixture<TestCasesCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCasesCountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestCasesCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
