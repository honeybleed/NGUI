import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinTitleComponent } from './win-title.component';

describe('WinTitleComponent', () => {
  let component: WinTitleComponent;
  let fixture: ComponentFixture<WinTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
