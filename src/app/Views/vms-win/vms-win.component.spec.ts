import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmsWinComponent } from './vms-win.component';

describe('VmsWinComponent', () => {
  let component: VmsWinComponent;
  let fixture: ComponentFixture<VmsWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmsWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmsWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
