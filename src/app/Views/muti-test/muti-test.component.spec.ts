import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutiTestComponent } from './muti-test.component';

describe('MutiTestComponent', () => {
  let component: MutiTestComponent;
  let fixture: ComponentFixture<MutiTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutiTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
