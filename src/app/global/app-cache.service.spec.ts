import { TestBed, inject } from '@angular/core/testing';

import { AppCacheService } from './app-cache.service';

describe('AppCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppCacheService]
    });
  });

  it('should be created', inject([AppCacheService], (service: AppCacheService) => {
    expect(service).toBeTruthy();
  }));
});
