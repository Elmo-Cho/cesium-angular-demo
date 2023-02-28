import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDictItemEditComponent } from './edit.component';

describe('SystemDictItemEditComponent', () => {
  let component: SystemDictItemEditComponent;
  let fixture: ComponentFixture<SystemDictItemEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SystemDictItemEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDictItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
