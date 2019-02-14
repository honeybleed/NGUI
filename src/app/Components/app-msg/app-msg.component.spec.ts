import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMsgComponent } from './app-msg.component';

describe('AppMsgComponent', () => {
  let component: AppMsgComponent;
  let fixture: ComponentFixture<AppMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
