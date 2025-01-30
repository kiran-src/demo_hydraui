import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupYaml2Component } from './setup-yaml2.component';

describe('SetupYaml2Component', () => {
  let component: SetupYaml2Component;
  let fixture: ComponentFixture<SetupYaml2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupYaml2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupYaml2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
