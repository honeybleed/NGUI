import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunVmMessageBoxComponent } from './run-vm-message-box.component';

describe('RunVmMessageBoxComponent', () => {
  let component: RunVmMessageBoxComponent;
  let fixture: ComponentFixture<RunVmMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunVmMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunVmMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
