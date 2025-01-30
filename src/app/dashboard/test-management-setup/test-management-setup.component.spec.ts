import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestManagementSetupComponent } from './test-management-setup.component';

describe('TestManagementSetupComponent', () => {
  let component: TestManagementSetupComponent;
  let fixture: ComponentFixture<TestManagementSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestManagementSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestManagementSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
