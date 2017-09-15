import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UButtonComponent } from './u-button.component';

describe('UButtonComponent', () => {
  let component: UButtonComponent;
  let fixture: ComponentFixture<UButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
