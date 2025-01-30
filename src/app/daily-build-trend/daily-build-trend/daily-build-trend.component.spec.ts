import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBuildTrendComponent } from './daily-build-trend.component';

describe('DailyBuildTrendComponent', () => {
  let component: DailyBuildTrendComponent;
  let fixture: ComponentFixture<DailyBuildTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyBuildTrendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyBuildTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
