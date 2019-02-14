import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLayerComponent } from './popup-layer.component';

describe('PopupLayerComponent', () => {
  let component: PopupLayerComponent;
  let fixture: ComponentFixture<PopupLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
