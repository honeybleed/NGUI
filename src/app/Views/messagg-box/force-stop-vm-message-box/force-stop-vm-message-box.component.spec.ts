import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceStopVmMessageBoxComponent } from './force-stop-vm-message-box.component';

describe('StopVmMessageBoxComponent', () => {
  let component: ForceStopVmMessageBoxComponent;
  let fixture: ComponentFixture<ForceStopVmMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceStopVmMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceStopVmMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
