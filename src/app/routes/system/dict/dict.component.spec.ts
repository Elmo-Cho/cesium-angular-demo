import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDictComponent } from './dict.component';

describe('SystemDictComponent', () => {
  let component: SystemDictComponent;
  let fixture: ComponentFixture<SystemDictComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SystemDictComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
