import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceCapacityComponent } from './resource-capacity.component';

describe('ResourceCapacityComponent', () => {
  let component: ResourceCapacityComponent;
  let fixture: ComponentFixture<ResourceCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceCapacityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
