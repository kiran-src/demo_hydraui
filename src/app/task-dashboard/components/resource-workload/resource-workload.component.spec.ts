import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceWorkloadComponent } from './resource-workload.component';

describe('ResourceWorkloadComponent', () => {
  let component: ResourceWorkloadComponent;
  let fixture: ComponentFixture<ResourceWorkloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceWorkloadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceWorkloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
