import { TestBed, inject } from '@angular/core/testing';

import { StyleMixinService } from './style-mixin.service';

describe('StyleMixinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StyleMixinService]
    });
  });

  it('should be created', inject([StyleMixinService], (service: StyleMixinService) => {
    expect(service).toBeTruthy();
  }));
});
