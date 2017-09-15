import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinTitleToolButtonComponent } from './win-title-tool-button.component';

describe('WinTitleToolButtonComponent', () => {
  let component: WinTitleToolButtonComponent;
  let fixture: ComponentFixture<WinTitleToolButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinTitleToolButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinTitleToolButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
