import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDictEditComponent } from './edit.component';

describe('SystemDictEditComponent', () => {
  let component: SystemDictEditComponent;
  let fixture: ComponentFixture<SystemDictEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SystemDictEditComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDictEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
