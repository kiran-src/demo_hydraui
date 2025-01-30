import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintOverviewComponent } from './sprint-overview.component';

describe('SprintOverviewComponent', () => {
  let component: SprintOverviewComponent;
  let fixture: ComponentFixture<SprintOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SprintOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
