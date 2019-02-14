import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmItemComponent } from './vm-item.component';

describe('VmItemComponent', () => {
  let component: VmItemComponent;
  let fixture: ComponentFixture<VmItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
