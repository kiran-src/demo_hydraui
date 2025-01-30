import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTestRunsComponent } from './active-test-runs.component';

describe('ActiveTestRunsComponent', () => {
  let component: ActiveTestRunsComponent;
  let fixture: ComponentFixture<ActiveTestRunsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveTestRunsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveTestRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
