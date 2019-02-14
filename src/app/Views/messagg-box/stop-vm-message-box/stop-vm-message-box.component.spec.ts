import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopVmMessageBoxComponent } from './stop-vm-message-box.component';

describe('StopVmMessageBoxComponent', () => {
  let component: StopVmMessageBoxComponent;
  let fixture: ComponentFixture<StopVmMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopVmMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopVmMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
