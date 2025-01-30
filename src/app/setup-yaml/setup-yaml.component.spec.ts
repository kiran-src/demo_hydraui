import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupYamlComponent } from './setup-yaml.component';

describe('SetupYamlComponent', () => {
  let component: SetupYamlComponent;
  let fixture: ComponentFixture<SetupYamlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupYamlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupYamlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
