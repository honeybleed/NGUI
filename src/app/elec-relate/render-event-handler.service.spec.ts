import { TestBed, inject } from '@angular/core/testing';

import { RenderEventHandlerService } from './render-event-handler.service';

describe('RenderEventHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RenderEventHandlerService]
    });
  });

  it('should be created', inject([RenderEventHandlerService], (service: RenderEventHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
