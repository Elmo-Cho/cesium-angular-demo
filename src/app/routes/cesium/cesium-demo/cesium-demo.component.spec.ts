import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CesiumCesiumDemoComponent } from './cesium-demo.component';

describe('CesiumCesiumDemoComponent', () => {
  let component: CesiumCesiumDemoComponent;
  let fixture: ComponentFixture<CesiumCesiumDemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CesiumCesiumDemoComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CesiumCesiumDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
