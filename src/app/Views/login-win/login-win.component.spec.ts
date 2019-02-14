import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWinComponent } from './login-win.component';

describe('LoginWinComponent', () => {
  let component: LoginWinComponent;
  let fixture: ComponentFixture<LoginWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
