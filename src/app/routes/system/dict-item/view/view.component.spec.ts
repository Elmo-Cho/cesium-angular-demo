import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDictItemViewComponent } from './view.component';

describe('SystemDictItemViewComponent', () => {
  let component: SystemDictItemViewComponent;
  let fixture: ComponentFixture<SystemDictItemViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SystemDictItemViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDictItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
