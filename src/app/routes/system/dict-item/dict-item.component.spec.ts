import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDictItemComponent } from './dict-item.component';

describe('SystemDictItemComponent', () => {
  let component: SystemDictItemComponent;
  let fixture: ComponentFixture<SystemDictItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SystemDictItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDictItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
