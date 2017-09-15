import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigCheckComponent } from './config-check.component';

describe('ConfigCheckComponent', () => {
  let component: ConfigCheckComponent;
  let fixture: ComponentFixture<ConfigCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
