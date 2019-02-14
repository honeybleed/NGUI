import { TestBed, inject } from '@angular/core/testing';

import { PopupLayerService } from './popup-layer.service';

describe('PopupLayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopupLayerService]
    });
  });

  it('should be created', inject([PopupLayerService], (service: PopupLayerService) => {
    expect(service).toBeTruthy();
  }));
});
