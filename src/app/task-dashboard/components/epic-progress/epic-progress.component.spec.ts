import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpicProgressComponent } from './epic-progress.component';

describe('EpicProgressComponent', () => {
  let component: EpicProgressComponent;
  let fixture: ComponentFixture<EpicProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpicProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpicProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
