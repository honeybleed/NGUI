import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RerunVmMessageBoxComponent } from './rerun-vm-message-box.component';

describe('RerunVmMessageBoxComponent', () => {
  let component: RerunVmMessageBoxComponent;
  let fixture: ComponentFixture<RerunVmMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RerunVmMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RerunVmMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
