import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectAnalyticsComponent } from './defect-analytics.component';

describe('DefectAnalyticsComponent', () => {
  let component: DefectAnalyticsComponent;
  let fixture: ComponentFixture<DefectAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefectAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefectAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
