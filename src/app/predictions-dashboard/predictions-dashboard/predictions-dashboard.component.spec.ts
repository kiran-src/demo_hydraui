import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionsDashboardComponent } from './predictions-dashboard.component';
import { beforeEach, describe } from 'node:test';

describe('PredictionsDashboardComponent', () => {
  let component: PredictionsDashboardComponent;
  let fixture: ComponentFixture<PredictionsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
